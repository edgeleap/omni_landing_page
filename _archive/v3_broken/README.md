# omni-landing (fixed)

Why the first version failed: when Bun is started with a single HTML entrypoint, it treats it as an SPA and serves that same HTML as a fallback for *all* paths. This caused `/views/commit` to return the landing page again inside the iframe.

This version starts Bun with a glob (`./src/**/*.html`) so all HTML files become routes.

## Run (local)

```bash
bun install
bun run dev
```

Open the printed URL (typically http://localhost:3000).

Routes should include:
- `/` (landing)
- `/views/commit`
- `/views/pr`
- `/views/release`

## Build

```bash
bun run build
bun run preview
```
