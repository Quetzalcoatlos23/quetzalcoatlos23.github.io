# GEBON.SYS — GitHub Pages build

Standalone version of the documentation site (HTML + Tailwind CDN + vanilla JS + Lenis CDN). No build step.

## Files
- `index.html` — page markup
- `styles.css` — theme, CRT, glitch, marquee, cursor, frames
- `app.js` — boot splash, typing terminal, docs tabs/accordion, lightbox, services, reveals
- `docs.js` — all documentation content (edit text, commands and screenshot numbers here)
- `shots/1.png … 75.png` — your screenshots
- `favicon.svg` — logo mark

## Deploy to GitHub Pages
1. Copy every file in this folder into your repository (root, or a `/docs` folder).
2. Commit and push.
3. On GitHub: Settings → Pages → Source: "Deploy from a branch" → pick `main` and `/ (root)` or `/docs` → Save.
4. Your site will be live at `https://quetzalcoatlos23.github.io/<repo-name>/`.

Open `index.html` directly in a browser to preview locally.
