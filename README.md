# Slide Frog

A Windows presentation app with a PowerPoint-style ribbon and **automatic picture arrangement**
(for example 5 pictures per slide, with layout, gap, margin and header/footer options).

(c) 2026 Ari Fitriansyah. All rights reserved. See `LICENSE.txt` (End User License Agreement).

## Project files

| File | Purpose |
|---|---|
| `index.html` | The whole application (UI + logic) |
| `main.js` | Electron main process (window, permissions) |
| `package.json` | App metadata, version and installer (electron-builder) settings |
| `icon.png`, `build/icon.ico` | Window and installer icons |
| `fonts/` | Bundled Syne font (works offline) |
| `build/license.txt`, `LICENSE.txt` | EULA shown during installation |
| `.github/workflows/build.yml` | GitHub Actions workflow that builds the EXE |

## Run locally

```bash
npm install
npm start
```

## Build the EXE on GitHub (recommended)

1. Create a new GitHub repository and upload all files of this folder (keep the `.github` folder).
2. Open the repository **Actions** tab and run **Build Windows installer** (button *Run workflow*).
   When it finishes, download the `Slide-Frog-Windows` artifact.
3. To publish a release, push a version tag:

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

   The workflow builds the files and attaches them to a GitHub Release:
   * `Slide-Frog-Setup-1.0.0.exe` - installer (language selection, EULA, install folder)
   * `Slide-Frog-Portable-1.0.0.exe` - portable version, no installation

## Build the EXE on your own Windows PC

```bash
npm install
npm run dist
```

The files are created in the `dist` folder.

## Installer languages (10)

English, Indonesian, Spanish, French, German, Portuguese (Brazil), Japanese, Korean,
Chinese (Simplified), Russian. A language selection dialog appears when the installer starts.
The EULA text is provided in English for all installer languages. The application itself is in English.

## Updating the version

Change the version in **both** places:

1. `package.json` -> `"version"`
2. `index.html` -> `const APP_VERSION='1.0.0';`

Then commit and push a new tag, for example `v1.0.1`.

## Windows SmartScreen note

The EXE is not code-signed, so Windows may show a "Windows protected your PC" warning the first time.
Click *More info -> Run anyway*. A code-signing certificate removes this warning.
