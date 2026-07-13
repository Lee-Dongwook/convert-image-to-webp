# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`convert-image-to-webp` is a small, published npm library (not an app) that converts/optimizes `.jpg`/`.png`/`.jpeg` images to WebP. It exposes two async functions and has no CLI or runtime entry point of its own.

## Commands

```bash
npm install        # install deps
npm run build      # tsc -> compiles *.ts to dist/ (the published output)
```

There is **no test suite and no linter configured**. `npm run build` is the only verification step — run it after changing any `.ts` file to confirm it still compiles.

Publishing runs `prepublishOnly` (build) automatically. The `files` field in package.json ships only `dist/`, `README.md`, `LICENSE`.

## Architecture

Two source files, both at the repo root:

- `index.ts` — public entry; re-exports `optimizeFolder` and `optimizeImages`.
- `convertToWebp.ts` — all logic.

Key points when editing `convertToWebp.ts`:

- **imagemin is the pipeline.** Conversion runs through `imagemin` with a plugin chosen by the `plugin` string argument (`"webp"` → `imagemin-webp` at quality 75; `"sharp"` → a custom adapter). The public `plugin: string` parameter is how callers switch behavior — keep it in sync with the README's API table if you change accepted values.
- **`imageminSharp` is a hand-rolled adapter** that wraps a `sharp` instance into imagemin's `(input: Uint8Array) => Promise<Buffer>` plugin shape. It's used only to inspect metadata (width check), not to transform output.
- **Output location:** for `"webp"`, converted files go to a `webp/` subfolder next to each source image; for `"sharp"`, they stay in the source directory. `optimizeFolder` globs `**/*.{jpg,png,jpeg}` and delegates to `optimizeImages`.
- **`warnedFiles` is module-level mutable state** tracking oversized images (width > `MAX_SIZE` = 5000px). It accumulates across calls and is never reset — relevant if you add tests or call the functions repeatedly in one process. Oversized images are warned about, never resized.

## Constraints

- `tsconfig.json` targets ES6 / CommonJS with `strict` on. `dist/` is the build output: it is **gitignored** (not committed) and produced fresh by `prepublishOnly` before publishing, then shipped via the `files` field. Rebuild locally with `npm run build` to verify changes; do not commit `dist/`.
- Do not add `fs` or `path` as dependencies. They are Node built-ins; earlier versions had bogus npm packages of those names in `dependencies`, which were intentionally removed.
