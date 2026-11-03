# ConXport Production Launch Checklist

This batch provides launch tooling. It **does not certify** the live deployment, authentication, Supabase RLS, privacy compliance, or transactional delivery.

## Before deploying
1. Run `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test`, and `npx playwright install chromium` / `npm run test:e2e`.
2. Run `node scripts/check-sql.mjs`, `node scripts/audit-security.mjs`, and `node scripts/check-routes.mjs`.
3. Confirm project-specific environment variables are configured as **Vercel Environment Variables** (public anon key only). Never put a service-role secret behind a `VITE_` variable.
4. Check `SITE_URL` and generate sitemap: `SITE_URL=https://YOUR_REAL_DOMAIN node scripts/generate-sitemap.mjs`. For Windows PowerShell: `$env:SITE_URL='https://YOUR_REAL_DOMAIN'; node scripts/generate-sitemap.mjs`.
5. IMPORTANT: The basic sitemap contains only static public paths. To list every published product, article and category, export the verified slugs and supply them in `SITEMAP_PUBLIC_PATHS` separated by commas, then regenerate; do not include drafts.
6. Verify Supabase redirect URLs include exact production auth callback URLs and email templates point at your domain.
7. Verify Edge Function `submit-enquiry` is **deployed**, CORS origin is set to the real domain, external rate limiting/CAPTCHA is configured, and a real test enquiry appears in database and admin CRM. Do not go live without these controls.
8. Validate database migrations `0001–0008` ran, all RLS policies are correct using a non-admin account, and private uploads are not publicly accessible.
9. Test guest and authenticated quote requests, product images, admin access denial, stock concurrency and genuine customer data deletion rights.
10. Confirm legal pages, contact details, privacy policy, consent, cookie usage and availability of real product certifications.
11. Verify live response headers, HTTPS, sitemap.xml, robots.txt, canonical URL, and redirects. Set Search Console and analytics only after consent/legal review.
12. Check Lighthouse mobile, LCP/CLS/INP, JS bundle size, and slow-network UX. Use 3D fallback for reduced motion.

## Vercel
- Import repository; framework Vite; build `npm run build`; output `dist`.
- Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_URL` as production settings.
- `vercel.json` provides SPA rewrite and basic security headers. Set a tested CSP separately; this project uses Three.js, Supabase and possibly third-party images and cannot safely use a guessed restrictive CSP.
- Add custom HTTPS domain. Set `SITE_ORIGIN` in Supabase Edge Function secrets to your HTTPS production origin.
- After publish, manually open `/products`, `/blog`, `/admin/login`, `/account`, and a valid product detail URL. Test on real devices.

## Not implemented by this batch
Server-rendered SEO, fully automated Supabase permission assertions, comprehensive browser tests, privacy compliance sign-off, full security penetration testing, automatic sitemap fetching of Supabase published records, email deliverability and production uptime monitoring. These require configured live infrastructure and human verification.
