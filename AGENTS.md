# Repository Guidelines

This repository contains the Quantum Skies Minecraft 1.20.1 modpack, built with Packwiz. The coremod is outdated and can be ignored (it became a different project called `ulv-covers-modern`), but is kept for reference. Use the Makefile targets to build and export artifacts.

## Project Structure & Module Organization
- `pack/` – Packwiz manifest (`pack.toml`, `index.toml`), configs, `kubejs/`, and mod descriptors.
- `cache/` – Local-only mods/resourcepacks and temporary tools. Git-ignored. Put non-API files in `cache/mods` or `cache/resourcepacks`.
- `build/` – Temporary build output and installer files. Git-ignored.
- `server-files/` – Generated server pack. Git-ignored.
- `art/`, `dev/` – Assets and local dev resources (ignored in releases).

## Build, Test, and Development Commands
- `make build` – Refresh Packwiz, assemble `build/`, export a distributable `quantum-skies-*.zip` to repo root.
- `make server` – Generate `server-files/` with Forge installer and pack data.
- `make cf` – Prepare a CurseForge-ready export in `cfbuild/` (includes cached mods where required).
- `make pull` – Sync configs/defaults from a local Prism instance back into `pack/` (see `Makefile` for `INSTALLPATH`).
- `make refresh` – Run `packwiz refresh` to update indexes.
- Prereqs: Java 17 JRE, Packwiz (`make bootstrap` installs), optional `ripgrep`, `dos2unix`.

## Coding Style & Naming Conventions
- KubeJS: JavaScript with 2–4 space indentation; keep files lowercase with underscores (e.g., `server_scripts/ae2/cells.js`). Group by domain (`ae2/`, `multiblocks/`, etc.).
- JSON/TOML: Compact, consistent quoting; avoid trailing commas. Keep Packwiz metadata authoritative; do not hand-edit generated hashes.
- Scripts: Bash/Python are small utilities; prefer clear, single-purpose scripts with descriptive names.

## Testing Guidelines
- No automated tests. Validate by: `make build` (zip produced) and launching via Prism/Forge, or `make server` then starting the server. For questbook version bumps, use `setversion.py` (run via `make cf`).

## Commit & Pull Request Guidelines
- Commits: Short, imperative summaries (lowercase ok), e.g., “update mods, fix AE2 recipes”. Group related changes.
- Do not commit artifacts: zips, `build/`, `server-files/`, `cache/`, `dev/` are git-ignored.
- PRs: Include a clear description, rationale, and affected areas (`pack/config`, `kubejs`, `coremod`). Attach screenshots for UI/JEI/quest changes. Confirm `make build` succeeds locally.

## Security & Configuration Tips
- Place proprietary or API-restricted jars into `cache/mods` or `cache/resourcepacks` before building. Never commit them.
- When updating mods, prefer Packwiz (`packwiz refresh`) and pin versions in `pack/mods/*.toml` where stability matters.
