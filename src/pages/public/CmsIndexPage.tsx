import { useEffect, useState } from 'react';
import BlogPage from './BlogPage';
import { ArrowRight, ArrowUpRight, BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router';
import { useDocumentMeta } from '../../seo/useDocumentMeta';
import CmsContentCard from '../../components/public/cms/CmsContentCard';
import { listCmsPublic } from '../../services/cmsPublic';
import type { CmsEntry, CmsKind } from '../../types/cms';

export default function CmsIndexPage({ kind, title }: { kind: CmsKind; title: string }) {
  if (kind === 'blog') return <BlogPage />;
  return <CmsIndexOther kind={kind} title={title} />;
}

function CmsIndexOther({ kind, title }: { kind: CmsKind; title: string }) {
  const canonicalPath = kind === 'case_study' ? '/case-studies' : '/resources';
  const isResource = kind === 'resource';
  const pageLabel = isResource ? 'Resources' : title;

  useDocumentMeta({
    title: `${pageLabel} | ConXport`,
    description: isResource
      ? 'Explore ConXport resources, guides and useful information about healthcare and medical equipment.'
      : `Browse published ${title.toLowerCase()} from ConXport.`,
    canonicalPath,
  });

  const [items, setItems] = useState<CmsEntry[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setItems([]);
    void listCmsPublic(kind)
      .then((rows) => { if (active) setItems(rows); })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : 'Unable to load content');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [kind]);

  return (
    <main className="min-h-[65vh] bg-white font-['Manrope',system-ui,sans-serif] !text-[#043C50]">
      <section className="relative overflow-hidden border-b border-[#E1EAEE] bg-[#F1F7FA]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-48 h-[440px] w-[440px] rounded-full bg-[#D84312]/[0.045] blur-3xl" />
        <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-12 lg:pb-20">
          <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-[12px] font-semibold sm:text-[13px]">
            <Link to="/" className="!text-[#647D88] no-underline transition hover:!text-[#D84312]">Home</Link>
            <span className="text-[#9CACB5]" aria-hidden="true">/</span>
            <span className="!text-[#D84312]">{pageLabel}</span>
          </nav>
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#D84312]/20 bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.15em] !text-[#D84312] shadow-sm">
            <BookOpen size={15} aria-hidden="true" /> ConXport Knowledge Hub
          </div>
          <h1 className="!m-0 max-w-[900px] !font-['Manrope',system-ui,sans-serif] !text-[clamp(2.35rem,5vw,4.5rem)] !font-extrabold !leading-[1.1] !tracking-[-0.052em] !text-[#043C50]">
            {pageLabel}<span className="!text-[#D84312]">.</span>
          </h1>
          <p className="!mb-0 !mt-5 max-w-[685px] !text-[15px] !leading-[1.85] !text-[#59717D] sm:!text-[17px]">
            {isResource
              ? 'Explore helpful resources, industry knowledge and practical guidance from ConXport.'
              : `Explore ConXport ${title.toLowerCase()} and discover relevant insights and information.`}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-5 pb-20 pt-12 sm:px-8 sm:pt-14 lg:px-12 lg:pb-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#E7EEF1] pb-6">
          <div>
            <p className="!mb-2 !text-[11px] !font-extrabold uppercase !tracking-[0.17em] !text-[#D84312]">Explore the collection</p>
            <h2 className="!m-0 !font-['Manrope',system-ui,sans-serif] !text-[clamp(1.4rem,2.5vw,1.9rem)] !font-extrabold !tracking-[-0.035em] !text-[#043C50]">
              {isResource ? 'Latest Resources' : pageLabel}
            </h2>
          </div>
          {!loading && !error && items.length > 0 && (
            <span className="rounded-full border border-[#DFE9ED] bg-[#F1F7FA] px-4 py-2 text-[12px] font-bold !text-[#043C50]">
              {items.length} {items.length === 1 ? 'resource' : 'resources'}
            </span>
          )}
        </div>

        {error ? (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-6 py-7 text-sm !text-red-700">{error}</div>
        ) : loading ? (
          <div role="status" className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading content">
            {[0, 1, 2].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-[#E0EAEE] bg-white" aria-hidden="true">
                <div className="aspect-[16/10] animate-pulse bg-[#EDF3F6]" />
                <div className="space-y-4 p-6">
                  <div className="h-3 w-28 animate-pulse rounded bg-[#EAF0F3]" />
                  <div className="h-6 w-5/6 animate-pulse rounded bg-[#EAF0F3]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#EAF0F3]" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-[#EAF0F3]" />
                </div>
              </div>
            ))}
            <span className="sr-only">Loading resources…</span>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-[#E0EAEE] bg-[#F1F7FA] px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#D84312] shadow-sm"><FileText size={30} aria-hidden="true" /></div>
            <h3 className="!m-0 !font-['Manrope',system-ui,sans-serif] !text-[22px] !font-extrabold !text-[#043C50]">No published resources yet</h3>
            <p className="!mb-0 !mt-3 !text-[14px] !text-[#607986]">New content will appear here once it is published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => <CmsContentCard key={item.id} item={item} />)}
          </div>
        )}

        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#E1EAEE] bg-[#F1F7FA] px-6 py-7 sm:flex-row sm:items-center sm:px-8">
          <div>
            <h3 className="!m-0 !font-['Manrope',system-ui,sans-serif] !text-lg !font-extrabold !text-[#043C50]">Looking for medical equipment?</h3>
            <p className="!mb-0 !mt-2 !text-sm !leading-relaxed !text-[#59717D]">Browse our catalogue and discover products for your requirements.</p>
          </div>
          <Link to="/products" className="group inline-flex shrink-0 items-center gap-2 rounded-full !bg-[#D84312] px-5 py-3 text-[13px] font-extrabold !text-white no-underline transition-all hover:-translate-y-0.5 hover:!bg-[#043C50]">
            Explore Products <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
