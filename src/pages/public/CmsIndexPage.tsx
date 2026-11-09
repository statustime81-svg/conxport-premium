import { useEffect, useState } from 'react';
import BlogPage from './BlogPage';
import { BookOpen, ArrowUpRight } from 'lucide-react';
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
  const canonicalPath = kind === 'blog' ? '/blog' : kind === 'case_study' ? '/case-studies' : '/resources';
  useDocumentMeta({
    title: `${title} | ConXport`,
    description: `Browse published ${title.toLowerCase()} from ConXport.`,
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

  const isBlog = kind === 'blog';

  return (
    <main className="min-h-[65vh] bg-white !text-[#152e35]">
      <section className="border-b border-[#e9f0ef] bg-white">
        <div className="mx-auto w-full max-w-[1320px] px-5 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-16 lg:px-12">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[12px] !text-[#74878b]">
            <Link to="/" className="!text-[#667b80] transition-colors hover:!text-[#07546B]">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold !text-[#07546B]">{isBlog ? 'Insights' : title}</span>
          </div>
          <p className="!mb-3 flex items-center gap-2 !text-[12px] !font-extrabold uppercase !tracking-[.16em] !text-[#07546B]">
            <BookOpen size={16} aria-hidden="true" /> CONXPORT / {isBlog ? 'JOURNAL' : 'CONTENT'}
          </p>
          <h1 className="!m-0 max-w-[850px] !font-sans !text-[clamp(2.2rem,4vw,3.7rem)] !font-extrabold !leading-[1.13] !tracking-[-.045em] !text-[#142c34]">
            {isBlog ? 'Insights & Blog' : title}
          </h1>
          <p className="!mb-0 !mt-4 max-w-[680px] !text-[15px] !leading-[1.85] !text-[#657a80] sm:!text-[16px]">
            {isBlog
              ? 'Explore updates, practical information and perspectives on hospital and laboratory equipment.'
              : `Explore ConXport ${title.toLowerCase()} and supporting information.`}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-5 pb-20 pt-10 sm:px-8 lg:px-12">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <h2 className="!m-0 !font-sans !text-[21px] !font-bold !tracking-[-.025em] !text-[#17333b]">
            {isBlog ? 'Latest articles' : title}
          </h2>
          {!loading && !error && items.length > 0 && (
            <span className="rounded-full bg-[#eff7f4] px-3 py-1.5 text-[12px] font-semibold !text-[#07546B]">
              {items.length} {items.length === 1 ? 'article' : 'articles'}
            </span>
          )}
        </div>

        {error ? (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-5 py-6 !text-sm !text-red-700">{error}</div>
        ) : loading ? (
          <div role="status" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-[#DCECF0] bg-white" aria-hidden="true">
                <div className="aspect-[16/10] animate-pulse bg-[#edf4f2]" />
                <div className="space-y-3 p-6">
                  <div className="h-3 w-24 animate-pulse rounded bg-[#e9f0ee]" />
                  <div className="h-5 w-5/6 animate-pulse rounded bg-[#e9f0ee]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#e9f0ee]" />
                </div>
              </div>
            ))}
            <span className="sr-only">Loading articles…</span>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-[#DCECF0] bg-[#F1F7FA] px-6 py-16 text-center">
            <BookOpen size={35} className="mx-auto mb-4 text-[#90afa7]" aria-hidden="true" />
            <h3 className="!m-0 !font-sans !text-[20px] !font-bold !text-[#17333b]">No published articles yet</h3>
            <p className="!mb-0 !mt-2 !text-sm !text-[#657a80]">New content will appear here when published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => <CmsContentCard key={item.id} item={item} />)}
          </div>
        )}

        <div className="mt-12 border-t border-[#e6eeec] pt-6">
          <Link to="/products" className="inline-flex items-center gap-2 text-[13px] font-bold !text-[#07546B] transition hover:gap-3">
            Explore equipment catalogue <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
