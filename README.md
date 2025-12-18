# Copy Reference (minimal extension)

Right‑click in the editor → **Copy Reference** to copy:
- `relative/path/to/file.js:12` for a cursor or single-line selection
- `relative/path/to/file.js:12-20` for a multi-line selection

## Quick try (no packaging)
1. Open this folder in VS Code.
2. Press `F5` (Run Extension) to launch an Extension Development Host.
3. Open any file, right‑click → **Copy Reference**.

## Optional: Package a VSIX
1. `npm install -g @vscode/vsce`
2. Run `vsce package` in this folder to create `copy-reference-0.0.1.vsix`.
3. In VS Code: **Extensions** → `…` → **Install from VSIX…**.

## Notes
- Uses workspace-relative paths (`asRelativePath`). If the file is outside your workspace, it falls back to an absolute path.
- Path separators are normalized to `/`.
