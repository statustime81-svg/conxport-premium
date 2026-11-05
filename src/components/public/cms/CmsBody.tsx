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
    <article className="min-h-[55vh] bg-white font-sans text-[#142c35]">
      <div className="mx-auto w-full max-w-[920px] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-12">
        {collection && (
          <Link
            to={collection.href}
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold !text-[#07546B] transition hover:gap-3 hover:!text-[#09483f]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {collection.label}
          </Link>
        )}

        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#07546B]">
          <span>ConXport / {entry.kind.replace(/_/g, ' ')}</span>
          {validDate && (
            <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-slate-500">
              <CalendarDays size={14} aria-hidden="true" />
              {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>

        <h1 className="!m-0 max-w-[900px] !font-sans !text-[clamp(30px,4vw,50px)] !font-extrabold !leading-[1.14] !tracking-[-0.035em] !text-[#112c35] [overflow-wrap:anywhere]">
          {entry.title}
        </h1>

        {entry.excerpt && (
          <p className="!mb-0 !mt-4 max-w-[760px] !text-[16px] !leading-[1.7] !text-[#637681] sm:!text-[18px]">
            {entry.excerpt}
          </p>
        )}

        {imageUrl && (
          <figure className="!mb-0 !mt-7 flex h-[210px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#f5f8f8] sm:h-[300px]">
            <img
              src={imageUrl}
              alt={entry.title}
              loading="eager"
              decoding="async"
              className="!m-0 !block !h-full !w-full !max-w-full !object-contain"
            />
          </figure>
        )}

        <div className="mt-8 max-w-[800px] border-t border-[#e6eceb] pt-7 sm:mt-9 sm:pt-8">
          <div className="whitespace-pre-wrap break-words font-sans text-[16px] leading-[1.9] text-[#293e47] sm:text-[17px]">
            {entry.body || 'More details will be published soon.'}
          </div>
        </div>

        {collection && (
          <div className="mt-12 border-t border-[#e6eceb] pt-6">
            <Link
              to={collection.href}
              className="group inline-flex items-center gap-2 text-sm font-bold !text-[#07546B] hover:!text-[#09483f]"
            >
              Back to {collection.label.toLowerCase()}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
