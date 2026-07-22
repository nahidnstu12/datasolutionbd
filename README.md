# Data Solution BD — Company Website

Modular one-page landing for [datasolutionbd.com](https://datasolutionbd.com), built with Next.js App Router.

## Structure

```
src/
  app/                 # layout (SEO + fonts) + page composer
  components/
    layout/            # Header, Footer, ScrollTop
    sections/          # Hero → Contact (one file per section)
    seo/               # JSON-LD schemas
    providers/         # scroll reveal / micro-interactions
  data/                # content modules (edit copy here)
public/images/         # static assets
```

## Develop

```bash
cd company-website
pnpm install   # or npm install
pnpm dev       # http://localhost:3000
```

## SEO

- Metadata API: title, description, OG, Twitter, canonical, robots
- File-based assets: `icon.png`, `apple-icon.png`, `opengraph-image.png`, `twitter-image.png`
- Dynamic `app/sitemap.js` (home + `/solutions/*`) and `app/robots.js`
- JSON-LD: Organization + WebSite (layout); SoftwareApplication list + FAQPage (homepage only); per-solution SoftwareApplication + BreadcrumbList
- Semantic landmarks: `header` / `main` / `footer`, labelled sections, skip link
- `not-found` is `noindex`

## Contact form (email)

Copy `.env.example` → `.env.local` and fill SMTP credentials. Submissions go to `CONTACT_TO_EMAIL` (default `nahid.dev19@gmail.com`) via Hostinger SMTP (`nodemailer` + server action `sendContactEmail`).

```bash
npm run dev
# submit the form on /#contact
```

## Production / VPS ops

Live on Hetzner behind Caddy; deploy via GitHub Actions → GHCR.

**Start here:** [docs/README.md](./docs/README.md)

| Doc | Purpose |
|-----|---------|
| [architecture](./docs/architecture.md) | Stack, folders, mental model |
| [deploy-cicd](./docs/deploy-cicd.md) | Actions, GHCR, secrets |
| [operations](./docs/operations.md) | SSH, logs, restarts |
| [runbook](./docs/runbook.md) | Troubleshooting |
| [server-setup](./docs/server-setup.md) | Rebuild / audit checklist |
| [dns-cloudflare](./docs/dns-cloudflare.md) | DNS + pharmacy caveat |
