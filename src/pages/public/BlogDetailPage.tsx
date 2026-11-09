import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowUpRight, BookOpen, CalendarDays } from 'lucide-react';
import { getCmsPublic } from '../../services/cmsPublic';
import type { CmsEntry } from '../../types/cms';
import { useDocumentMeta } from '../../seo/useDocumentMeta';
import { articleSchema } from '../../seo/structuredData';
import { safeCmsUrl } from '../../lib/cms/format';

/** Blog-only detail design; CMS storage, metadata and article schema are preserved. */
export default function BlogDetailPage() {
  const { slug } = useParams();
  const [item, setItem] = useState<CmsEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setItem(null);
    void getCmsPublic('blog', slug ?? '')
      .then((result) => { if (active) setItem(result); })
      .catch((err: unknown) => { if (active) setError(err instanceof Error ? err.message : 'Unable to load article'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  useDocumentMeta(
    item ? {
      title: `${item.title} | ConXport`,
      description: item.seo_description || item.excerpt || item.title,
      canonicalPath: `/blog/${item.slug}`,
      type: 'article',
    } : {
      title: 'Content | ConXport',
      description: 'ConXport information and resources.',
      noindex: !loading && !item,
    },
    item ? articleSchema(item) : undefined,
  );

  if (loading) return <section role="status" className="mx-auto max-w-[950px] px-5 py-24 text-[#5F7280]">Loading article…</section>;
  if (error) return <section role="alert" className="mx-auto max-w-[950px] px-5 py-24 text-red-700">{error}</section>;
  if (!item) return <section className="mx-auto max-w-[950px] px-5 py-24 text-[#5F7280]">This content is unavailable.</section>;

  const image = safeCmsUrl(item.image_url);
  const dateValue = item.published_at;
  const date = dateValue ? new Date(dateValue) : null;
  const validDate = date && !Number.isNaN(date.getTime());

  return (
    <article className="min-h-[55vh] bg-[#FFFCF9] font-['Manrope',system-ui,sans-serif] text-[#043C50]">
      <section className="relative isolate overflow-hidden border-b border-[#E7E9E8] pb-10 pt-12 sm:pb-14 sm:pt-16">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(4,60,80,.08),transparent_68%)]" />
        <div className="relative mx-auto w-[min(1050px,calc(100%-40px))]">
          <Link to="/blog" className="group mb-10 inline-flex items-center gap-2 text-sm font-bold !text-[#043C50] transition hover:!text-[#D84312]"><ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1"/> All insights</Link>
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5D8CF] bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.15em] !text-[#D84312]"><BookOpen size={14}/> CONXPORT JOURNAL</span>
            {validDate && <span className="inline-flex items-center gap-2 text-xs font-semibold !text-[#6C7D86]"><CalendarDays size={15}/><time dateTime={dateValue ?? undefined}>{date.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</time></span>}
          </div>
          <h1 style={{fontFamily: "DM Serif Display, Georgia, serif"}} className="!m-0 max-w-[1050px] [overflow-wrap:anywhere] !font-['DM_Serif_Display',Georgia,serif] !text-[clamp(2.7rem,6vw,5.6rem)] !font-normal !leading-[1.065] !tracking-[-.05em] !text-[#043C50]">{item.title}<span className="!text-[#D84312]">.</span></h1>
          {item.excerpt && <p className="!mb-0 mt-6 max-w-[790px] text-[clamp(16px,1.8vw,20px)] leading-[1.8] !text-[#5F7280]">{item.excerpt}</p>}
        </div>
      </section>
      <div className="mx-auto w-[min(1050px,calc(100%-40px))] pb-20 pt-9 sm:pb-24 sm:pt-12">
        {image && <figure className="!m-0 flex h-[240px] w-full items-center justify-center overflow-hidden rounded-[24px] border border-[#E1E9E8] bg-white shadow-[0_30px_65px_-48px_rgba(4,60,80,.28)] sm:h-[340px] lg:h-[380px]"><img src={image} alt={item.title} loading="eager" decoding="async" className="block h-full w-full max-w-full object-contain" /></figure>}
        <div className="mx-auto mt-10 max-w-[850px] sm:mt-14">
          <div className="mb-7 flex items-center gap-3"><span className="h-[3px] w-12 rounded-full bg-[#D84312]"/><span className="text-[11px] font-extrabold uppercase tracking-[.18em] !text-[#D84312]">THE ARTICLE</span></div>
          <div className="whitespace-pre-wrap break-words font-['Manrope',system-ui,sans-serif] text-[16px] leading-[2] text-[#354D58] sm:text-[17px]">{item.body || 'More details will be published soon.'}</div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-[#E0E7E5] pt-8">
            <Link to="/blog" className="group inline-flex items-center gap-2 text-sm font-bold !text-[#043C50] hover:!text-[#D84312]"><ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1"/> Back to all insights</Link>
            <Link to="/products" className="group inline-flex items-center gap-2 rounded-full bg-[#D84312] px-6 py-3.5 text-sm font-bold !text-white shadow-[0_15px_35px_-22px_rgba(216,67,18,.7)] transition hover:-translate-y-1 hover:!bg-[#043C50]">Explore equipment <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
