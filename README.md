# harvest-widget

Proof-of-concept static page for embedding a Harvest widget in Coda via GitHub Pages.

## What this is

A minimal hello-world site deployed to GitHub Pages. The goal is to prove the deploy + embed loop before adding Harvest timer features.

## One-time GitHub setup

1. **Create the repo** on GitHub (public is fine):
   - Name: `harvest-widget`
   - Do not initialize with a README (this repo already has one)

2. **Push this project:**

   ```bash
   git init
   git add .
   git commit -m "Initial hello-world GitHub Pages POC"
   git branch -M main
   git remote add origin https://github.com/<your-username>/harvest-widget.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Repo **Settings → Pages → Build and deployment**
   - Source: **GitHub Actions**

4. **Wait for the deploy workflow** (Actions tab → "Deploy to GitHub Pages").

5. **Visit your site** at:

   ```
   https://<your-username>.github.io/harvest-widget/
   ```

## Smoke test

After the first deploy completes, run:

```bash
node scripts/smoke-test.mjs https://<your-username>.github.io/harvest-widget/
```

The script checks for HTTP 200, the heading text, and the `data-smoke="ok"` marker.

## Embed in Coda

1. Open your Coda doc.
2. Type `/embed` or insert an **Embed** block.
3. Paste your GitHub Pages URL:
   ```
   https://<your-username>.github.io/harvest-widget/
   ```
4. Confirm the iframe shows the hello-world page.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank embed in Coda | Confirm the URL loads in a browser first. Use the full project URL including `/harvest-widget/`. |
| 404 on Pages URL | Wait for the GitHub Actions deploy to finish. Check **Settings → Pages** shows a green checkmark. |
| Smoke test fails | Pages may still be propagating — wait a minute and retry. |

## Project structure

```
index.html                  # Hello-world page (embed target)
.github/workflows/deploy.yml  # GitHub Pages deploy on push to main
scripts/smoke-test.mjs      # Post-deploy verification script
```

## Next steps

- Add Harvest timer UI
- Wire up OAuth / API calls
- Add `postMessage` bridge if the widget needs Coda doc context
