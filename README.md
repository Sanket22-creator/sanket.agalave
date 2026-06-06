# Sanket Portfolio (scaffold)

This is a small Vite + React + Tailwind scaffold created from a single-file React component.

Quick start:

1. Install dependencies

```bash
cd /path/to/sanket-portfolio
npm install
```

2. Run dev server

```bash
npm run dev
```

Notes:
- Replace images in the `public` or project root (e.g. `/profile.jpeg`, `/bbw.svg`).
- Tailwind is configured in `tailwind.config.cjs`.

GitHub Pages deploy:

1. Push this repo to GitHub on the `main` branch.
2. In repo settings, enable Pages from the GitHub Actions source.
3. Every push to `main` will build and publish the site.

Deployment notes for the chat widget:

1. The frontend is static and must be built with the Railway backend URL baked in.
2. Set `VITE_CHAT_API_URL` to your Railway backend service URL before building the GitHub Pages site.
3. The backend must expose `GET /health` and `POST /ask`.
4. Railway must have `GROQ_API_KEY` set in the backend service environment.
5. If the frontend and backend are on different domains, keep both on HTTPS.
