import { useState } from 'react';
import { ArrowUpRight, ImageOff } from 'lucide-react';
import { Link } from 'react-router';
import type { PublicCategory } from '../../services/publicCatalogue';

export default function CategoryTile({ category }: { category: PublicCategory }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(category.image_url && !imageFailed);

  return (
    <Link
      to={`/categories/${encodeURIComponent(category.slug)}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e1e9e9] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#aacfc7] hover:shadow-[0_14px_34px_rgba(16,61,58,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d7363]"
    >
      <div className="flex h-44 w-full items-center justify-center overflow-hidden bg-[#f4f7f7] p-4 sm:h-48">
        {showImage ? (
          <img
            src={category.image_url!}
            alt={category.name}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#8ba1a7]">
            <ImageOff size={28} strokeWidth={1.5} />
            <span className="text-xs">Image not available</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="!m-0 text-[10px] font-extrabold uppercase tracking-[0.15em] !text-[#0d7363]">
          {category.parent_id ? 'Subcategory' : 'Equipment category'}
        </p>
        <h3 className="!mb-0 !mt-2 !font-sans !text-xl !font-bold !leading-snug !tracking-[-0.03em] !text-[#173139]">
          {category.name}
        </h3>
        <p className="!mb-0 !mt-2 line-clamp-2 min-h-[2.7em] text-sm !leading-relaxed !text-[#647780]">
          {category.description?.trim() || 'Browse available equipment in this category.'}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0d7363]">
          Explore category <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
