#!/usr/bin/env bash
set -e

echo "=== Paz em Finanças: Empacotamento Multiplataforma ==="
echo "Verificando ambiente..."

NODE_VERSION=$(node -v)
echo "Node version: $NODE_VERSION"

echo "1. Executando build de produção com base relativa para file://..."
cross-env DESKTOP_BUILD=true pnpm build

echo "2. Gerando artefato Linux (AppImage)..."
pnpm exec electron-builder --linux AppImage --config desktop/electron-builder.yml --publish never

echo "Nota sobre macOS e Windows:"
echo "- macOS (.dmg / .zip): Requer um host macOS com Xcode Command Line Tools."
echo "  Comando no Mac: pnpm desktop:build && pnpm exec electron-builder --mac --config desktop/electron-builder.yml"
echo "- Windows (.exe NSIS / portable): Requer um host Windows (ou Wine + makensis instalado no Linux)."
echo "  Comando no Windows: pnpm desktop:build && pnpm exec electron-builder --win --config desktop/electron-builder.yml"

echo "=== Empacotamento concluído com sucesso! ==="
