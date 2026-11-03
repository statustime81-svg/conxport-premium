# ConXport correction package (03 November 2026)

## Exactly what was corrected

- Root `/` renders `src/App.tsx`. The previously added sections existed in a separate unused HomePage.tsx, so they were invisible. This release integrates `ManagedClients`, `LatestProducts`, `ManagedTestimonials` and `ManagedFaq` **into the real App.tsx route** without replacing the existing hero, category grid, featured products, CMS or Why ConXport blocks.
- The Admin Overview screen (`src/pages/admin/DashboardPage.tsx`) is a new premium 12-module dashboard, with database-based counts and direct links to every requested manager.
- Admin layout/sidebar uses `src/styles/admin-v2.css` imported by `src/layouts/AdminLayout.tsx` after previous styles, providing a consistent dark sidebar and light content layout. It scopes styles under `.cx-admin-compact` to avoid affecting the existing public UI.
- Existing pages `/contact`, `/certifications`, `/our-expo`, `/blog/:slug` and backend routes `/admin/showcase/:kind`, `/admin/contact-messages` are retained and linked.
- Company PDF is at `/public/downloads/conxport-company-profile.pdf` and navigation includes direct download.
- Certificate manager accepts an image or PDF and the public certificate cards don't try to render PDFs as images.

## Required to make backend content visible

1. Use your **existing Supabase project** and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in `.env` (see `.env.example`). Do NOT put a service role key in the browser.
2. In your existing project migrations, apply pending migrations through `supabase/migrations/0010_public_extras.sql` to create `site_showcase` and `contact_messages`. You must have already installed prior migrations including the admin-check helper `public.is_conxport_admin()` and the `product-public` storage bucket. Verify each migration in staging first.
3. Sign into `/admin/login` using a Supabase account already allowed by the project's admin permissions.
4. Add items under `/admin/showcase/testimonial`, `/admin/showcase/client`, `/admin/showcase/faq`, `/admin/showcase/certificate`, `/admin/showcase/expo_photo` and `/admin/showcase/expo_video`. Published items render on public pages. The gallery accepts up to 10 photos.
5. For Our Latest Products, publish products in `/admin/products`. The newest published products are shown on `/`.
6. Test `/contact` form, then confirm its new message appears in `/admin/contact-messages`.
7. Use `npm install` and `npm run build`; deploy the **new build**, not the older ZIP. For SPA routing, configure hosting to rewrite unknown paths to `/index.html`.

## Validation actually performed

- `node node_modules/typescript/bin/tsc -b`: PASS.
- Static route presence check: PASS for Our Expo, Certificates, Contact, Contact inbox, Showcase admin, Blog detail.
- Full Vite bundle: NOT VERIFIED in this execution environment because the previously extracted node_modules lacks a required platform-specific rolldown native package. Re-install dependencies on the target machine and run `npm run build`.
- Live Supabase writes, authentication, uploads and browser/E2E UI: NOT VERIFIED (no live project access). Do not assume production functionality until you run them.

## No unrelated public redesign

The existing homepage hero, category sequence, featured products and Why ConXport remain in `src/App.tsx`. The new sections were appended rather than replacing the screenshot-matched content. Existing category/product/enquiry backend routes remain in place.
