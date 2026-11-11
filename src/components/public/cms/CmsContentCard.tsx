import { ArrowUpRight, CalendarDays, FileText } from 'lucide-react';
import { Link } from 'react-router';
import type { CmsEntry } from '../../../types/cms';
import { cmsPublicPath, safeCmsUrl } from '../../../lib/cms/format';

const kindLabels: Record<CmsEntry['kind'], string> = {
  homepage: 'Homepage', page: 'Page', blog: 'Insights',
  case_study: 'Case Study', resource: 'Resource',
};
const actionLabels: Record<CmsEntry['kind'], string> = {
  homepage: 'View page', page: 'View page', blog: 'Read article',
  case_study: 'View case study', resource: 'View resource',
};

export default function CmsContentCard({ item }: { item: CmsEntry }) {
  const image = safeCmsUrl(item.image_url);
  const dateValue = item.published_at ?? item.created_at;
  const date = dateValue && !Number.isNaN(Date.parse(dateValue))
    ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(dateValue))
    : null;

  return (
    <article className="group h-full min-w-0 overflow-hidden rounded-2xl border border-[#E0EAEE] bg-white font-['Manrope',system-ui,sans-serif] transition-all duration-300 hover:-translate-y-1 hover:border-[#D84312]/30 hover:shadow-[0_22px_48px_-28px_rgba(4,60,80,0.3)]">
      <Link to={cmsPublicPath(item.kind, item.slug)} className="flex h-full min-w-0 flex-col !text-[#043C50] no-underline" aria-label={`${actionLabels[item.kind]}: ${item.title}`}>
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#F1F7FA]">
          {image ? (
            <img src={image} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.055]" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E7F0F5] to-[#F7FAFC]">
              <FileText size={42} strokeWidth={1.2} className="text-[#8DA9B6]" aria-hidden="true" />
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/95 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.11em] !text-[#D84312] shadow-sm backdrop-blur-sm">
            {kindLabels[item.kind]}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          {date && (
            <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold !text-[#718792]">
              <CalendarDays size={14} aria-hidden="true" />
              <time dateTime={dateValue ?? undefined}>{date}</time>
            </div>
          )}
          <h2 className="!m-0 line-clamp-2 !font-['Manrope',system-ui,sans-serif] !text-[19px] !font-extrabold !leading-[1.4] !tracking-[-0.035em] !text-[#043C50] transition-colors duration-200 group-hover:!text-[#D84312] sm:!text-[21px]">{item.title}</h2>
          {item.excerpt && <p className="!mb-0 !mt-3 line-clamp-3 !text-[14px] !leading-[1.8] !text-[#607986]">{item.excerpt}</p>}
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[13px] font-extrabold !text-[#D84312]">
            {actionLabels[item.kind]}
            <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
