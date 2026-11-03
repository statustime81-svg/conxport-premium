# ConXport website updates (3 November 2026)

This archive is an update of the supplied React + Vite + Tailwind + Supabase codebase, not a replacement project. Existing catalogue, auth, admin, quotations and other business modules remain in place.

## Installation

1. Use Node.js 22.12+ and npm 10+. Run `npm install` on your target operating system. Do not copy the previously supplied Windows `node_modules` folder to Linux.
2. Copy `.env.example` to `.env.local`, enter your actual Supabase public URL and anon key, and keep secrets out of client code and version control.
3. Apply Supabase migrations in `supabase/migrations` in numeric order through `0010_public_extras.sql`. Run it only after 0001-0009. The migration creates `site_showcase` and `contact_messages` tables with RLS.
4. Ensure the existing `product-public` storage bucket and admin policies from previous migrations are working. Showcase uploads use its `showcase/` prefix.
5. Run `npm run typecheck`, `npm run lint`, `npm run build` and `npm run dev`. Check routes and verify with your Supabase project.

## New admin paths

`/admin/showcase/testimonial` Client reviews; `/admin/showcase/client` client logos; `/admin/showcase/faq` FAQs; `/admin/showcase/certificate` certificates; `/admin/showcase/expo_photo` 10 expo images; `/admin/showcase/expo_video` YouTube embeds; `/admin/contact-messages` inbound contact form messages. Existing `/admin/products` manages the latest product listings.

## Public paths

`/` homepage with existing hero/category/catalogue components and new sections; `/our-expo`; `/certifications`; `/faq`; `/contact`; `/downloads/conxport-company-profile.pdf`; existing `/blog/:slug` and other routes preserved.

## Notes

- No real testimonials, expo photos, client logos or YouTube links were invented. Add them through admin after applying migration.
- The company profile PDF is the exact provided document, copied to `public/downloads`. Certificate records must be entered or uploaded by admin.
- Admin media and contact records require the existing configured Supabase backend and active RLS policies. The original quotation form remains separate.
- TypeScript typecheck passed in this environment. Vite build and Vitest could not launch against uploaded Windows dependencies on Linux due to unavailable native `@rolldown/binding-linux-x64-gnu`; run a fresh platform-specific `npm install` before checking them. No claim of live-end-to-end testing is made.
- Existing backend configuration was not changed and the original `.env.local` is deliberately omitted from this ZIP.
