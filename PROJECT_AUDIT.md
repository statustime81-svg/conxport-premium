# ConXport project audit (2026-11-02)

## Completed on the uploaded source
- Inspected uploaded project structure, Supabase migrations, authentication guards, enquiry function, current routes and main services.
- Fixed two TypeScript errors in account enquiry details and saved product pages caused by Supabase embedded relationship results arriving as arrays.
- Kept existing functionality and file paths, with no destructive restructuring.
- Removed all `backup-*` folders, `node_modules`, generated `dist`, generated build cache and local secrets from this **clean distribution ZIP**.
- Replaced `.env.example` project-specific configuration with placeholders and created `.gitignore` excluding local secrets/build output.
- Checked `tsc -b`: PASS (with uploaded dependency versions).
- Checked ESLint: 0 errors, 6 Fast Refresh warnings (non-blocking).

## Important limitations
- Full `vite build` cannot be independently confirmed on this Linux runner using uploaded Windows `node_modules`: its native Rolldown module is Windows-only. Run `npm ci; npm run typecheck; npm run build; npm run lint` on Windows.
- This is **not** a fully finished website. 108 scaffold files in the uploaded archive were empty (many planned admin, CMS, SEO, 3D/360 viewer, and corporate pages). They remain placeholders, not implemented features.
- Admin product CRUD, inventory mutations, actual catalogue sync, formal quote PDFs, real 3D product assets, dynamic SEO/prerender, gated document downloads and the complete CMS remain unfinished.
- The enquiry Edge Function requires deployment and abuse protection before a public launch. Current client rejects demonstration product IDs and attachments. Don't describe it as a live production enquiry flow until tested end-to-end.
- SQL migrations present in source are not evidence that your remote Supabase instance is fully migrated; verify tables and RLS in the dashboard.
- The `.env.local` file from the uploaded ZIP is intentionally omitted; preserve your working local `.env.local` when updating your PC.

## Windows installation
1. Extract clean source ZIP to a **new folder** (not on top of working project).
2. Copy your own `.env.local` from the original project to the new folder (do not upload it publicly).
3. In PowerShell in the new folder run: `npm ci`, `npm run typecheck`, `npm run build`, `npm run lint`, `npm run dev`.
4. Compare with old project before replacing it. Native dependencies are installed for Windows by `npm ci`.

## Security reminder
Never expose `SUPABASE_SERVICE_ROLE_KEY` or private secrets with a `VITE_` prefix. Review RLS, attachment restrictions and rate limiting prior to production.
