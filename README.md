# Nuvem

A concept furniture collection by [Roman Gomez](https://rgomezdesign.com): four chairs in natural oak and soft fabrics, designed for modern calm.

**Live:** https://rgomezdesign.github.io/nuvem/

## Pages
- **Home** — hero carousel and the four chairs, each resting on Nuvem's cloud shape
- **Collection / [chair]** — product page (one template for Aire, Frame, Shell, Arc): materials, specs, details, more from the collection
- **Materials** — natural oak and the four fabrics, plus care
- **About** — the idea behind the name, principles, and contact

## Motion
Chairs float gently on their clouds, cloud and chair layers drift at different speeds on scroll, the chair glides from the homepage into its product page (React `<ViewTransition>`), and content rises in as you scroll. Everything respects `prefers-reduced-motion`.

## Stack
Next.js 16 (static export) · React 19 · Tailwind CSS 4 · Poppins. Design tokens in `src/app/tokens.ts` mirror the Figma variables.

```bash
npm install
npm run dev        # http://localhost:3000
GITHUB_PAGES=true npm run build   # static export to out/ with the /nuvem base path
```

Deploys to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`).

Source renders and process images live in a local `design/` folder (not in this repo).
