# suman.portfolio

A personal hub built to last — Next.js + TypeScript + Tailwind CSS, with content
in Markdown/MDX and a Playwright suite that runs against the build in CI.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build a static site

```bash
npm run build      # outputs ./out — deploy to Vercel, Netlify, or any static host
```

## Run the tests

```bash
npx playwright install   # first time only
npm run test:e2e
```

## Add content

- **Blog posts** live in `content/blog/*.mdx`. Frontmatter: `title`, `date`, `summary`.
- **Experience** lives in `content/experience/*.md`. Frontmatter: `role`, `org`, `start`, `end`, `summary`.

New files appear automatically — no code changes needed.

## Design

The look is a system called "Verified" in `src/app/globals.css`. Colours, fonts,
and spacing are tokens there; retune the whole site from that one file.
