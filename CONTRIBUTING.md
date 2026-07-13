# Contributing to convert-image-to-webp

Thanks for your interest in contributing! 🎉 This is a small, friendly project and
**first-time contributors are very welcome**.

## New here?

Look for issues labeled [**good first issue**](https://github.com/Lee-Dongwook/convert-image-to-webp/labels/good%20first%20issue).
They're small, self-contained, and described with enough context to start right away.
Feel free to comment on an issue to let others know you're working on it.

## Project layout

The whole library is two TypeScript files at the repo root:

- `index.ts` — public entry point; re-exports the two functions.
- `convertToWebp.ts` — all the logic (`optimizeImages`, `optimizeFolder`).

Compiled output lives in `dist/` and is **committed to the repo** (it's also the
published npm artifact), so it must be rebuilt when you change source.

## Development setup

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/convert-image-to-webp.git
cd convert-image-to-webp

# 2. Install dependencies
npm install

# 3. Make your change in index.ts / convertToWebp.ts

# 4. Rebuild dist/ (this is the only verification step)
npm run build
```

There is currently no test suite or linter — `npm run build` (which runs `tsc`
in `strict` mode) is how we verify a change compiles. Please make sure it passes
and commit the updated `dist/` output along with your source changes.

## Submitting a pull request

1. Create a branch off `main`.
2. Keep the change focused on a single issue.
3. Run `npm run build` and commit both source and rebuilt `dist/`.
4. Open a PR that references the issue (e.g. `Closes #12`) and briefly describes
   what you changed and why.

## A couple of conventions

- Don't add `fs` or `path` as dependencies — they are Node.js built-ins.
- Keep the public API in sync with the README's API table when you change it.

## Questions?

Not sure about something? Open an issue or ask on the issue you're working on —
happy to help. Thanks for contributing! 💜
