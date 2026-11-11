import { useEffect, useState } from 'react';
import BlogPage from './BlogPage';
import { ArrowUpRight, FileText } from 'lucide-react';
import '../../styles/resources-theme.css';
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
      <section className="cx-resource-hero relative overflow-hidden border-b border-[#E5ECEE]">
        <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-16 pt-9 sm:px-8 sm:pb-20 sm:pt-12 lg:px-12 lg:pb-24">
          <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-[12px] font-semibold sm:text-[13px]">
            <Link to="/" className="!text-[#667E89] no-underline transition hover:!text-[#D84312]">Home</Link>
            <span aria-hidden="true" className="text-[#9CACB5]">/</span>
            <span className="!text-[#D84312]">{pageLabel}</span>
          </nav>
          <p className="!mb-5 !text-[11px] !font-extrabold uppercase !tracking-[0.2em] !text-[#637986]">ConXport / Knowledge Center</p>
          <h1 className="cx-resource-display !m-0 max-w-[1050px] !text-[clamp(2.65rem,5.8vw,5.5rem)] !leading-[1.07] !tracking-[-0.045em] !text-[#043C50]">
            {isResource ? (<>Resources for <span className="cx-resource-display-italic !text-[#D84312]">better healthcare.</span></>) : (<>{pageLabel}<span className="cx-resource-display-italic !text-[#D84312]"> & insights.</span></>)}
          </h1>
          <p className="!mb-0 !mt-6 max-w-[680px] !text-[15px] !leading-[1.85] !text-[#637986] sm:!text-[17px]">
            {isResource ? 'Explore practical guides, medical equipment information and resources to help you make informed decisions.' : `Explore ConXport ${title.toLowerCase()} and discover relevant insights and information.`}
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

        <div className="cx-resource-cta mt-16 rounded-[26px] border border-[#E2EAED] bg-[#F8FAFB] px-6 py-10 sm:px-10 sm:py-11 lg:px-11">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="min-w-0">
              <p className="!mb-3 !text-[11px] !font-extrabold uppercase !tracking-[0.20em] !text-[#657C8A]">Need assistance?</p>
              <h2 className="cx-resource-display !m-0 !text-[clamp(1.95rem,3.6vw,3.5rem)] !leading-[1.15] !tracking-[-0.035em] !text-[#043C50]">
                Have a medical equipment <span className="cx-resource-display-italic !text-[#D84312]">requirement?</span>
              </h2>
              <p className="!mb-0 !mt-4 !text-[14px] !leading-[1.8] !text-[#667C8A] sm:!text-[16px]">Share your requirements and our team can discuss the next steps.</p>
            </div>
            <Link to="/contact" className="group inline-flex min-h-[52px] shrink-0 items-center justify-center gap-3 self-start rounded-full !bg-[#D84312] px-7 py-3 text-[13px] font-extrabold !text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:!bg-[#043C50] lg:self-center">
              Contact ConXport <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
