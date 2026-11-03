import { writeFileSync, mkdirSync } from 'node:fs';
const site = process.env.SITE_URL || process.env.VITE_SITE_URL;
if (!site || !/^https:\/\//.test(site)) { console.error('Set SITE_URL=https://your-domain before generating sitemap'); process.exit(1); }
const origin = new URL(site).origin;
const routes = ['/', '/products', '/categories', '/blog', '/case-studies', '/resources', '/about'];
const extra = (process.env.SITEMAP_PUBLIC_PATHS || '').split(',').map(x=>x.trim()).filter(Boolean);
const allowed = [...new Set([...routes,...extra])].filter(path=>/^\/[a-z0-9/_-]*$/.test(path) && !/(^\/admin|^\/account|login|register|quote)/.test(path));
const escape = (v) => v.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allowed.map(path=>`  <url><loc>${escape(new URL(path,origin).href)}</loc></url>`).join('\n')}
</urlset>
`;
mkdirSync('public',{recursive:true});writeFileSync('public/sitemap.xml',xml);console.log(`Created sitemap: ${allowed.length} public routes at ${origin}`);
