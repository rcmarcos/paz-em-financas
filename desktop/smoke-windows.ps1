$ErrorActionPreference = "Stop"

$releaseDir = if ($env:GITHUB_WORKSPACE) { Join-Path $env:GITHUB_WORKSPACE "release" } else { "release" }
$smokeRoot = Join-Path $env:RUNNER_TEMP "paz-windows-smoke"
Remove-Item -Recurse -Force $smokeRoot -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $smokeRoot | Out-Null
$env:PAZ_SMOKE_TEST = "true"

function Invoke-PazSmoke {
  param(
    [Parameter(Mandatory = $true)][string]$Executable,
    [Parameter(Mandatory = $true)][string]$Label
  )

  $userData = Join-Path $smokeRoot "$Label-user-data"
  $resultPath = Join-Path $userData "paz-smoke-result.json"
  Remove-Item -Recurse -Force $userData -ErrorAction SilentlyContinue
  New-Item -ItemType Directory -Force $userData | Out-Null

  $process = Start-Process -FilePath $Executable -ArgumentList @("--user-data-dir=$userData", "--no-sandbox", "--disable-gpu") -PassThru
  $deadline = (Get-Date).AddSeconds(90)
  while (-not (Test-Path $resultPath) -and (Get-Date) -lt $deadline) {
    Start-Sleep -Seconds 2
  }

  if (-not (Test-Path $resultPath)) {
    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
    throw "Smoke test '$Label' não produziu resultado em 90 segundos."
  }

  $result = Get-Content $resultPath -Raw | ConvertFrom-Json
  $result | ConvertTo-Json -Compress
  Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
  if (-not $result.ok) {
    throw "Smoke test '$Label' falhou: $($result.reason)"
  }
}

$nsisInstaller = Get-ChildItem -Path $releaseDir -Filter "*Setup*.exe" | Select-Object -First 1
if (-not $nsisInstaller) { throw "Instalador NSIS não encontrado em $releaseDir" }
$installDir = Join-Path $smokeRoot "installed"
$installerProcess = Start-Process -FilePath $nsisInstaller.FullName -ArgumentList @("/S", "/D=$installDir") -Wait -PassThru
if ($installerProcess.ExitCode -ne 0) { throw "Instalador NSIS falhou com código $($installerProcess.ExitCode)" }
$installedApp = Get-ChildItem -Path $installDir -Filter "Paz em Finanças.exe" -Recurse | Select-Object -First 1
if (-not $installedApp) { throw "Aplicativo não encontrado após a instalação NSIS" }
Invoke-PazSmoke -Executable $installedApp.FullName -Label "nsis"

$portable = Get-ChildItem -Path $releaseDir -Filter "*Portable*.exe" | Select-Object -First 1
if (-not $portable) { throw "Executável Portable não encontrado em $releaseDir" }
Invoke-PazSmoke -Executable $portable.FullName -Label "portable"

Write-Host "Windows NSIS e Portable validados com smoke test offline."
