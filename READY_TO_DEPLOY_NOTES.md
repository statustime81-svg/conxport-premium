# ConXport premium refresh – deploy notes

## What was updated
- Premium public UI refresh with cleaner whitespace, larger typography and healthcare-oriented styling.
- Header/footer refreshed for a more premium hospital brand presentation.
- New working public Contact page.
- Admin CMS sections activated for:
  - Homepage
  - Pages
  - Blog
  - Case Studies
  - Resources
- New admin pages activated for:
  - SEO settings
  - General settings
  - Import / Export
- CMS editor now supports image upload in addition to manual image URL.
- Added `site_settings` support and admin-manageable storage upload policy migration.

## Validation status
- `npm run typecheck` ✅ passed
- `npm run lint` ✅ passed with warnings only (no blocking errors)
- `npm run build` ⚠ in this container the build is blocked by a missing optional native `rolldown` binding from dependencies.
  - On your machine, if you see the same error, run:
    1. delete `node_modules`
    2. delete `package-lock.json`
    3. run `npm install`
    4. run `npm run build`

## Important database step
Apply the new migration before using Settings / SEO / CMS image upload:
- `supabase/migrations/0009_site_settings_and_storage.sql`

## Optional replacement work you can do later
- Replace temporary concept visuals / AI placeholders with your final real medical and hospital images.
- Update General Settings with your actual phone, email, WhatsApp and address.
- Update SEO Settings with your production domain and OG image.
