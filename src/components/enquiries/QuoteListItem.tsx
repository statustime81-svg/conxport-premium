import { Link } from 'react-router';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import { findProduct } from '../../data/productDetails';
import { removeQuoteItem } from '../../store/quote-list';

type QuoteListItemProps = {
  slug: string;
  index?: number;
};

export default function QuoteListItem({ slug, index }: QuoteListItemProps) {
  const product = findProduct(slug);
  const title = product?.name ?? slug;

  return (
    <article className="group flex flex-col gap-4 rounded-[22px] border border-[#e0ebe6] bg-[#f9fcfa] p-5 transition-colors hover:border-[#b9d5c9] hover:bg-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d5e7df] bg-white font-['Manrope',system-ui,sans-serif] text-sm font-extrabold text-[#0d5c4f]">
          {String(index ?? 1).padStart(2, '0')}
        </div>
        <div className="min-w-0">
          <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.13em] !text-[#0d5c4f]">{product?.category ?? 'Catalogue enquiry'}</p>
          <Link to={`/products/${encodeURIComponent(slug)}`} className="mt-2 inline-flex items-start gap-1 font-['Manrope',system-ui,sans-serif] text-[18px] font-extrabold leading-snug !text-[#142c26] transition-colors hover:!text-[#0d5c4f]">
            <span className="break-words">{title}</span> <ArrowUpRight size={16} className="mt-1 shrink-0" />
          </Link>
          <p className="m-0 mt-2 text-sm leading-6 !text-[#70837b]">{product?.model ?? 'Product details available on request'}</p>
        </div>
      </div>
      <button type="button" aria-label={`Remove ${title}`} title="Remove from quote list" onClick={() => removeQuoteItem(slug)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-xl border border-[#e3eae6] bg-white text-[#74847d] transition-colors hover:border-[#eabdb9] hover:bg-[#fff3f1] hover:text-[#b64035] sm:self-center">
        <Trash2 size={18}/>
      </button>
    </article>
  );
}
