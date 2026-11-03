import { ArrowUpRight, CalendarDays, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router';
import type { CmsEntry } from '../../../types/cms';
import { cmsPublicPath, safeCmsUrl } from '../../../lib/cms/format';

const kindLabels: Record<CmsEntry['kind'], string> = {
  homepage: 'Homepage',
  page: 'Page',
  blog: 'Insights',
  case_study: 'Case study',
  resource: 'Resources',
};

export default function CmsContentCard({ item }: { item: CmsEntry }) {
  const image = safeCmsUrl(item.image_url);
  const dateValue = item.published_at ?? item.created_at;
  const date = dateValue && !Number.isNaN(Date.parse(dateValue))
    ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(dateValue))
    : null;

  return (
    <article className="group h-full min-w-0 overflow-hidden rounded-2xl border border-[#e3ecea] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#bad7d0] hover:shadow-[0_20px_45px_-25px_rgba(13,92,79,0.24)]">
      <Link
        to={cmsPublicPath(item.kind, item.slug)}
        className="flex h-full min-w-0 flex-col !text-[#152e35] no-underline"
        aria-label={`Read ${item.title}`}
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#edf4f2]">
          {image ? (
            <img
              src={image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#e7f1ef] to-[#f6faf9]">
              <ImageIcon size={42} strokeWidth={1.1} className="text-[#93b7ae]" aria-hidden="true" />
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.08em] !text-[#0d5c4f] shadow-sm backdrop-blur-sm">
            {kindLabels[item.kind]}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {date && (
            <div className="mb-3 flex items-center gap-1.5 text-[12px] font-medium !text-[#71858a]">
              <CalendarDays size={14} aria-hidden="true" />
              <time dateTime={dateValue}>{date}</time>
            </div>
          )}
          <h2 className="!m-0 line-clamp-2 !font-sans !text-[19px] !font-bold !leading-[1.35] !tracking-[-.025em] !text-[#152e35] transition-colors duration-200 group-hover:!text-[#0d7363] sm:!text-[21px]">
            {item.title}
          </h2>
          {item.excerpt && (
            <p className="!mb-0 !mt-3 line-clamp-3 !text-[14px] !leading-[1.75] !text-[#63777c]">
              {item.excerpt}
            </p>
          )}
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] font-bold !text-[#0d5c4f]">
            Read article
            <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
