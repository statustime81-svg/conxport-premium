import '../../../styles/resources-theme.css';
import { Link } from 'react-router';
import { ArrowLeft, ArrowUpRight, CalendarDays } from 'lucide-react';
import type { CmsEntry } from '../../../types/cms';
import { safeCmsUrl } from '../../../lib/cms/format';

const collectionPaths: Record<string, { href: string; label: string }> = {
  blog: { href: '/blog', label: 'All insights' },
  case_study: { href: '/case-studies', label: 'Case studies' },
  resource: { href: '/resources', label: 'Resources' },
};

export default function CmsBody({ entry }: { entry: CmsEntry }) {
  const imageUrl = safeCmsUrl(entry.image_url);
  const collection = collectionPaths[entry.kind];
  const date = entry.published_at ? new Date(entry.published_at) : null;
  const validDate = date && !Number.isNaN(date.getTime());

  return (
    <article className="min-h-[60vh] bg-white font-['Manrope',system-ui,sans-serif] !text-[#043C50]">
      <header className="cx-resource-hero border-b border-[#E3ECF0]">
        <div className="mx-auto w-full max-w-[1000px] px-5 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12">
          {collection && (
            <Link to={collection.href} className="group mb-9 inline-flex items-center gap-2 text-[13px] font-bold !text-[#59717D] no-underline transition hover:!text-[#D84312]">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" /> {collection.label}
            </Link>
          )}
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-extrabold uppercase tracking-[0.14em] !text-[#D84312]">
            <span>ConXport / {entry.kind.replace(/_/g, ' ')}</span>
            {validDate && (
              <span className="inline-flex items-center gap-1.5 font-semibold normal-case tracking-normal !text-[#718792]">
                <CalendarDays size={14} aria-hidden="true" />
                <time dateTime={entry.published_at ?? undefined}>{date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
              </span>
            )}
          </div>
          <h1 className="!m-0 max-w-[950px] !font-['Manrope',system-ui,sans-serif] !text-[clamp(2rem,4.1vw,3.45rem)] !font-extrabold !leading-[1.18] !tracking-[-0.045em] !text-[#043C50] [overflow-wrap:anywhere]">{entry.title}</h1>
          {entry.excerpt && <p className="!mb-0 !mt-5 max-w-[830px] !text-[15px] !leading-[1.85] !text-[#59717D] sm:!text-[17px]">{entry.excerpt}</p>}
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1000px] px-5 pb-20 pt-9 sm:px-8 sm:pt-12">
        {imageUrl && (
          <figure className="!m-0 overflow-hidden rounded-2xl border border-[#E0EAEE] bg-[#F1F7FA] p-3 sm:p-5">
            <div className="flex h-[220px] items-center justify-center sm:h-[310px] lg:h-[360px]">
              <img src={imageUrl} alt={entry.title} loading="eager" decoding="async" className="!m-0 !block !h-full !w-full !max-w-full !object-contain" />
            </div>
          </figure>
        )}
        <div className="mt-9 max-w-[880px] border-t border-[#E3ECF0] pt-8 sm:mt-11 sm:pt-10">
          {/* Body is stored as plain text. Preserve line breaks; do not interpret untrusted HTML. */}
          <div className="whitespace-pre-wrap break-words !font-['Manrope',system-ui,sans-serif] !text-[15px] !leading-[2] !text-[#365463] sm:!text-[16px]">
            {entry.body || 'More details will be published soon.'}
          </div>
        </div>
        {entry.kind === 'resource' && (
          <div className="cx-resource-cta mt-14 rounded-[26px] border border-[#E2EAED] bg-[#F8FAFB] px-6 py-9 sm:px-9">
            <p className="!mb-3 !text-[11px] !font-extrabold uppercase !tracking-[0.18em] !text-[#657C8A]">Need assistance?</p>
            <h2 className="cx-resource-display !m-0 !text-[clamp(1.75rem,3vw,2.9rem)] !leading-[1.16] !text-[#043C50]">Have a medical equipment <span className="cx-resource-display-italic !text-[#D84312]">requirement?</span></h2>
            <p className="!mb-5 !mt-3 !text-sm !leading-[1.8] !text-[#667C8A]">Share your requirements and our team can discuss the next steps.</p>
            <Link to="/contact" className="group inline-flex items-center gap-3 rounded-full !bg-[#D84312] px-6 py-3 text-sm font-bold !text-white no-underline transition hover:!bg-[#043C50]">Contact ConXport <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        )}
        {collection && (
          <div className="mt-14 border-t border-[#E3ECF0] pt-7">
            <Link to={collection.href} className="group inline-flex items-center gap-2 text-[13px] font-extrabold !text-[#D84312] no-underline transition hover:!text-[#043C50]">
              Back to {collection.label.toLowerCase()}
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
