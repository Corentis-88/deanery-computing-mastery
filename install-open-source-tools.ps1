# Installs only the named open-source course tools. It never uninstalls packages.
$ErrorActionPreference = "Continue"

if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Error "winget is not available. Use docs/software-toolkit.md for official download links."
    exit 1
}

$packages = @(
    @{ Name = "Thonny"; Id = "AivarAnnamaa.Thonny" },
    @{ Name = "TurboWarp Desktop"; Id = "GarboMuffin.TurboWarp" },
    @{ Name = "LibreOffice"; Id = "TheDocumentFoundation.LibreOffice" },
    @{ Name = "Krita"; Id = "KDE.Krita" },
    @{ Name = "Blender"; Id = "BlenderFoundation.Blender" }
)

foreach ($package in $packages) {
    Write-Host "Checking $($package.Name)..."
    winget list --id $package.Id --exact --accept-source-agreements | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Already installed: $($package.Name)"
        continue
    }
    Write-Host "Installing $($package.Name)..."
    winget install --id $package.Id --exact --silent `
        --accept-package-agreements --accept-source-agreements --disable-interactivity
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "$($package.Name) did not install automatically. See docs/software-toolkit.md."
    }
}

Write-Host "Finished. No package was uninstalled or removed."
Write-Host "DB Browser and draw.io use the hash-verified MSI files downloaded beside the repository."
