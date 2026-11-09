import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router';
import { useDocumentMeta } from '../../seo/useDocumentMeta';
import { listCmsPublic } from '../../services/cmsPublic';
import type { CmsEntry } from '../../types/cms';
import { cmsPublicPath, safeCmsUrl } from '../../lib/cms/format';

/** Blog-only design. Shared CMS pages, cards and admin workflows stay unchanged. */
export default function BlogPage() {
  useDocumentMeta({
    title: 'Insights & Blog | ConXport',
    description: 'Browse published insights & blog from ConXport.',
    canonicalPath: '/blog',
  });

  const [items, setItems] = useState<CmsEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    void listCmsPublic('blog')
      .then((data) => { if (active) setItems(data); })
      .catch((err: unknown) => { if (active) setError(err instanceof Error ? err.message : 'Unable to load articles'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <main className="min-h-[65vh] bg-[#FFFCF9] font-['Manrope',system-ui,sans-serif]">
      <style>{`
        .cx-blog-card { transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s ease, border-color .45s ease; }
        .cx-blog-card:hover, .cx-blog-card:focus-within { transform:translateY(-8px); border-color:rgba(216,67,18,.32); box-shadow:0 32px 70px -38px rgba(4,60,80,.38); }
        .cx-blog-card img { transition:transform .8s cubic-bezier(.2,.8,.2,1); }
        .cx-blog-card:hover img, .cx-blog-card:focus-within img { transform:scale(1.065); }
        @media (prefers-reduced-motion:reduce){.cx-blog-card,.cx-blog-card img{transition:none!important;transform:none!important;}}
      `}</style>
      <section className="relative isolate overflow-hidden border-b border-[#E8E8E3] bg-[#FFFCF9]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(4,60,80,.09),transparent_66%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-0 h-[370px] w-[370px] rounded-full bg-[radial-gradient(circle,rgba(216,67,18,.08),transparent_68%)]" />
        <div className="relative mx-auto w-[min(1320px,calc(100%-40px))] pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24">
          <nav className="mb-9 flex items-center gap-2 text-xs font-semibold text-[#667882]" aria-label="Breadcrumb">
            <Link to="/" className="transition hover:!text-[#D84312]">Home</Link><span>/</span><span className="!text-[#D84312]">Insights</span>
          </nav>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#D84312]/20 bg-white/80 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[.18em] !text-[#043C50] shadow-sm">
            <BookOpen size={16} className="text-[#D84312]" /> CONXPORT JOURNAL
          </div>
          <h1 style={{fontFamily: "DM Serif Display, Georgia, serif"}} className="!m-0 max-w-[1000px] !font-['DM_Serif_Display',Georgia,serif] !text-[clamp(3.5rem,8vw,7.5rem)] !font-normal !leading-[.99] !tracking-[-.055em] !text-[#043C50]">
            Insights <span className="italic !text-[#D84312]">&amp; Blog.</span>
          </h1>
          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="!mb-0 max-w-[690px] text-[clamp(15px,1.6vw,19px)] leading-[1.85] !text-[#5F7280]">
              Explore updates, practical information and perspectives on hospital and laboratory equipment.
            </p>
            <span className="hidden h-[3px] w-24 shrink-0 rounded-full bg-[#D84312] sm:block" aria-hidden="true" />
          </div>
        </div>
      </section>
      <section className="mx-auto w-[min(1320px,calc(100%-40px))] py-16 sm:py-20" aria-labelledby="cx-blog-latest">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="!mb-3 text-[11px] font-extrabold uppercase tracking-[.18em] !text-[#D84312]">LATEST FROM CONXPORT</p>
            <h2 id="cx-blog-latest" style={{fontFamily: "DM Serif Display, Georgia, serif"}} className="!m-0 !font-['DM_Serif_Display',Georgia,serif] !text-[clamp(2.3rem,4vw,3.7rem)] !font-normal !leading-tight !text-[#043C50]">Latest <span className="italic !text-[#D84312]">articles.</span></h2>
          </div>
          {!loading && !error && items.length > 0 && <span className="rounded-full border border-[#E8D7CD] bg-white px-4 py-2 text-xs font-bold !text-[#043C50]">{items.length} {items.length === 1 ? 'article' : 'articles'}</span>}
        </div>
        {error ? (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-red-700">{error}</div>
        ) : loading ? (
          <div role="status" className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => <div key={i} aria-hidden="true" className="overflow-hidden rounded-[26px] border border-[#E1E9E8] bg-white"><div className="aspect-[16/10] animate-pulse bg-[#E8F0F0]"/><div className="space-y-3 p-6"><div className="h-3 w-24 animate-pulse rounded bg-[#E8F0F0]"/><div className="h-6 w-5/6 animate-pulse rounded bg-[#E8F0F0]"/><div className="h-4 w-full animate-pulse rounded bg-[#E8F0F0]"/></div></div>)}
            <span className="sr-only">Loading articles…</span>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[#D9E5E6] bg-white px-8 py-16 text-center"><BookOpen size={36} className="mx-auto mb-4 text-[#D84312]"/><h3 className="!mb-2 !font-['DM_Serif_Display',Georgia,serif] !text-3xl !font-normal !text-[#043C50]">No published articles yet</h3><p className="!mb-0 !text-[#5F7280]">New content will appear here when published.</p></div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const image = safeCmsUrl(item.image_url);
              const rawDate = item.published_at ?? item.created_at;
              const date = rawDate && !Number.isNaN(Date.parse(rawDate)) ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(rawDate)) : null;
              return <article key={item.id} className="cx-blog-card group min-w-0 overflow-hidden rounded-[26px] border border-[#E2E9E9] bg-white shadow-[0_16px_42px_-38px_rgba(4,60,80,.2)]">
                <Link to={cmsPublicPath(item.kind, item.slug)} aria-label={`Read ${item.title}`} className="flex h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EAF2F2]">
                    {image ? <img src={image} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_65%_40%,#DAEAED,#F6FAFA)]"><ImageIcon size={45} strokeWidth={1.2} className="text-[#7997A0]" aria-hidden="true"/></div>}
                    <span className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/95 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] !text-[#D84312] shadow-sm backdrop-blur">INSIGHTS</span>
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-7 pt-6 sm:px-7">
                    {date && <div className="mb-4 flex items-center gap-2 text-xs font-semibold !text-[#70818B]"><CalendarDays size={14}/><time dateTime={rawDate ?? undefined}>{date}</time></div>}
                    <h3 style={{fontFamily: "DM Serif Display, Georgia, serif"}} className="!m-0 line-clamp-3 !font-['DM_Serif_Display',Georgia,serif] !text-[clamp(1.65rem,2.1vw,2.1rem)] !font-normal !leading-[1.16] !tracking-[-.035em] !text-[#043C50] transition-colors group-hover:!text-[#D84312]">{item.title}</h3>
                    {item.excerpt && <p className="!mb-0 mt-4 line-clamp-3 text-sm leading-[1.85] !text-[#61737D]">{item.excerpt}</p>}
                    <div className="mt-auto flex items-center gap-2 pt-7 text-sm font-extrabold !text-[#D84312]">Read article <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                  </div>
                </Link>
              </article>;
            })}
          </div>
        )}
        <div className="mt-14 border-t border-[#E4E8E5] pt-7"><Link to="/products" className="group inline-flex items-center gap-2 text-sm font-bold !text-[#043C50] transition hover:!text-[#D84312]">Explore equipment catalogue <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></Link></div>
      </section>
    </main>
  );
}
