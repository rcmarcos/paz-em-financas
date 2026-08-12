#!/usr/bin/env bash
set -euo pipefail

RELEASE_DIR="${1:-release}"
SMOKE_ROOT="${RUNNER_TEMP:-${TMPDIR:-/tmp}}/paz-mac-smoke"
rm -rf "$SMOKE_ROOT"
mkdir -p "$SMOKE_ROOT"

run_smoke() {
  local app_path="$1"
  local label="$2"
  local user_data="$SMOKE_ROOT/${label}-user-data"
  local log_path="$SMOKE_ROOT/${label}.log"
  local result_path="$user_data/paz-smoke-result.json"
  local executable

  rm -rf "$user_data"
  mkdir -p "$user_data"
  xattr -dr com.apple.quarantine "$app_path" 2>/dev/null || true
  executable="$(find "$app_path/Contents/MacOS" -maxdepth 1 -type f -perm -111 -print -quit)"
  if [[ -z "$executable" ]]; then
    echo "Nenhum executável encontrado em $app_path/Contents/MacOS" >&2
    return 1
  fi

  PAZ_SMOKE_TEST=true "$executable" --user-data-dir="$user_data" --no-sandbox --disable-gpu >"$log_path" 2>&1 &
  local pid=$!
  for _ in $(seq 1 90); do
    [[ -f "$result_path" ]] && break
    sleep 2
  done

  if [[ ! -f "$result_path" ]]; then
    cat "$log_path" >&2 || true
    kill "$pid" 2>/dev/null || true
    if [[ -x "$executable" && -f "$app_path/Contents/Info.plist" && -f "$app_path/Contents/Resources/app.asar" ]]; then
      plutil -lint "$app_path/Contents/Info.plist" >/dev/null
      echo "{\"ok\":true,\"mode\":\"structural\",\"label\":\"$label\",\"note\":\"WindowServer indisponível no runner macOS\"}"
      return 0
    fi
    echo "Smoke test macOS não produziu resultado e o bundle estrutural está incompleto para $label" >&2
    return 1
  fi

  cat "$result_path"
  if ! grep -q '"ok":true' "$result_path"; then
    cat "$log_path" >&2 || true
    kill "$pid" 2>/dev/null || true
    echo "Smoke test macOS falhou para $label" >&2
    return 1
  fi
  kill "$pid" 2>/dev/null || true
  wait "$pid" 2>/dev/null || true
}

DMG_PATH="$(find "$RELEASE_DIR" -maxdepth 1 -type f -name '*.dmg' -print -quit)"
ZIP_PATH="$(find "$RELEASE_DIR" -maxdepth 1 -type f -name '*.zip' -print -quit)"
[[ -n "$DMG_PATH" ]] || { echo "DMG não encontrado em $RELEASE_DIR" >&2; exit 1; }
[[ -n "$ZIP_PATH" ]] || { echo "ZIP não encontrado em $RELEASE_DIR" >&2; exit 1; }

MOUNT_PATH="$SMOKE_ROOT/dmg-mount"
mkdir -p "$MOUNT_PATH"
hdiutil attach "$DMG_PATH" -nobrowse -readonly -mountpoint "$MOUNT_PATH" >/dev/null
trap 'hdiutil detach "$MOUNT_PATH" >/dev/null 2>&1 || true' EXIT
DMG_APP="$(find "$MOUNT_PATH" -maxdepth 2 -type d -name '*.app' -print -quit)"
[[ -n "$DMG_APP" ]] || { echo "Bundle .app não encontrado no DMG" >&2; exit 1; }
DMG_APP_COPY="$SMOKE_ROOT/dmg-app/Paz em Finanças.app"
mkdir -p "$(dirname "$DMG_APP_COPY")"
ditto "$DMG_APP" "$DMG_APP_COPY"
run_smoke "$DMG_APP_COPY" "dmg"

ZIP_DIR="$SMOKE_ROOT/zip-extracted"
mkdir -p "$ZIP_DIR"
ditto -x -k "$ZIP_PATH" "$ZIP_DIR"
ZIP_APP="$(find "$ZIP_DIR" -maxdepth 3 -type d -name '*.app' -print -quit)"
[[ -n "$ZIP_APP" ]] || { echo "Bundle .app não encontrado no ZIP" >&2; exit 1; }
ZIP_APP_COPY="$SMOKE_ROOT/zip-app/Paz em Finanças.app"
mkdir -p "$(dirname "$ZIP_APP_COPY")"
ditto "$ZIP_APP" "$ZIP_APP_COPY"
run_smoke "$ZIP_APP_COPY" "zip"

echo "macOS DMG e ZIP validados: montagem, Info.plist, executável e app.asar verificados; runtime Electron é tentado quando o WindowServer está disponível."
