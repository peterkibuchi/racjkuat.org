# Audit findings (2026-07-11)

Open items from the July 2026 dependency-update and audit run. Fixed items live in git history.

- MEDIUM — DNS / domain registration — the racjkuat.org domain is NOT REGISTERED (.org registry RDAP returns 404; NXDOMAIN everywhere). The site cannot be reached at its custom domain until the domain is (re)registered and DNS pointed at the host. Remedy: (re)register racjkuat.org and point DNS at the Vercel deployment.
- LOW — src/lib/utils.ts (getBlurDataURL) — interpolates the image URL into wsrv.nl without encodeURIComponent, and the build depends on a third-party service (there is a placeholder fallback). Remedy: encode the URL parameter and/or generate blur placeholders locally at build time.
- LOW — src/app/(site)/(blog-post)/blog/[slug]/page.tsx (generateStaticParams) — does not filter on `published`, so unpublished posts remain reachable by direct URL (category/list pages now filter). Remedy: filter drafts in generateStaticParams and return notFound() for unpublished slugs if drafts should not ship.
- LOW — src/components/sections/partners.tsx — template-leftover partner logos (Next.js/Prisma/etc.) behind a commented-out homepage toggle. Remedy: replace with real partner content or delete the section before re-enabling.
- INFO — next.config.ts — no security headers configured (X-Content-Type-Options, Referrer-Policy, frame-ancestors/X-Frame-Options); Vercel adds HSTS itself. Remedy: add a headers() block if desired.
- INFO — dependencies — 3 moderate build-time transitive advisories with no fix path short of overrides (postcss pinned by next; uuid and @opentelemetry/core via contentlayer2). Remedy: wait for upstream releases; revisit on the next update run.
- NIT — src/components/copy-button.tsx — copied-state setTimeout lacks unmount cleanup. Remedy: clear the timeout in a useEffect cleanup.
