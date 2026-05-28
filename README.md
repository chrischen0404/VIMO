# VIMO 願動 PWA

VIMO = Vow Into Motion. This React + Vite + Tailwind project packages the VIMO landing experience as a Progressive Web App.

## Local setup

```bash
npm install
npm run dev
```

Production-like PWA testing:

```bash
npm run build
npm run preview
```

Open the preview URL in Chrome, then inspect with DevTools > Application and Lighthouse.

## Deployment

Use these settings on Vercel or Netlify:

- Build command: `npm run build`
- Publish directory: `dist`
- Framework preset: Vite

PWA install prompts require HTTPS in production.

## Netlify launch test

This project includes Netlify Forms for:

- `vimo-wish`: early wish submissions
- `vimo-provider`: supplier partner applications

After deploying to Netlify, open Site configuration > Forms to verify submissions. Both forms redirect to `/success`, which is handled by the React app through `public/_redirects`.

Analytics hooks are prepared in `src/App.jsx` through `dataLayer`, `gtag`, and `plausible`. Add the provider script in `index.html` when you choose an analytics tool.
