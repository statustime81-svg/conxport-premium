# ConXport logo-based branding update

Scope: visual color branding only. Existing layout, text, routes, Supabase integration, SQL, assets and product data are unchanged.

Palette:
- Medical Blue: #07546B
- ConXport Orange: #FF4F18
- Deep Orange for primary CTA: #D84312
- Dark Blue Hover: #053F52
- Light Blue: #F1F7FA
- Pale Aqua: #E7F5F7
- White: #FFFFFF
- Dark Text: #102D3C

Files modified: 76 source UI files (CSS and TSX).
No new pages or components were created. No backend / database files were modified.

Install:
1. Back up your current project.
2. EITHER use the FULL project archive as your current project source (copy your existing .env.local separately),
   OR extract the PATCH archive into your project root, preserving relative src/... paths.
3. In a terminal inside your project:
   npm install
   npm run typecheck
   npm run build
   npm run dev
4. Check public pages and admin screens visually.

Quality verification:
- `npm run typecheck` passed in preparation environment.
- `npm run build` reached Vite but this environment lacked an existing optional native Rolldown dependency.
  Please run `npm install` then `npm run build` locally.
- Project ZIP intentionally excludes node_modules, .git, dist, .env.local and private secrets.
- Original logo and public image assets are preserved as provided.

Notes:
- The visual palette is proposed, inspired by the supplied ConXport logo.
- No product/catalogue images or data were changed.
