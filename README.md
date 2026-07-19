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
- JSON-LD: Organization, WebSite, SoftwareApplication list, FAQPage
- Semantic landmarks: `header` / `main` / `footer`, labelled sections, skip link

## Contact form (email)

Copy `.env.example` → `.env.local` and fill SMTP credentials. Submissions go to `CONTACT_TO_EMAIL` (default `nahid.dev19@gmail.com`) via Hostinger SMTP (`nodemailer` + server action `sendContactEmail`).

```bash
npm run dev
# submit the form on /#contact
```
