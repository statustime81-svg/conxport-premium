
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import type { PublicCategory } from '../../services/publicCatalogue';

type CategoryWithImage = PublicCategory & {
  image_url?: string | null;
};

export default function DatabaseCategoryCard({
  category,
}: {
  category: CategoryWithImage;
}) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="
        group block h-full overflow-hidden
        rounded-[28px]
        border border-[#102D3C]/10
        bg-[#f7f9f9]
        transition-all duration-500
        hover:-translate-y-2
        hover:border-[#07546B]/25
        hover:shadow-[0_30px_70px_-25px_rgba(13,92,79,0.22)]
      "
    >
      {/* Image area */}
      <div
        className="
          relative flex aspect-[4/3]
          items-center justify-center
          overflow-hidden bg-[#eef3f2]
        "
      >
        {category.image_url ? (
          <img
            src={category.image_url}
            alt={category.name}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-105
            "
          />
        ) : (
          <div className="px-8 text-center">
            <span
              className="
                text-xs font-semibold uppercase
                tracking-[0.18em] text-[#82928e]
              "
            >
              Image not uploaded
            </span>
          </div>
        )}

        {/* Arrow */}
        <div
          className="
            absolute right-5 top-5
            flex h-12 w-12 items-center justify-center
            rounded-full bg-white/95 text-[#07546B]
            shadow-sm transition-all duration-300
            group-hover:bg-[#07546B] group-hover:text-white
          "
        >
          <ArrowUpRight size={21} />
        </div>
      </div>

      {/* Content */}
      <div className="px-7 pb-8 pt-7">
        <p
          className="
            mb-3 text-[11px] font-bold uppercase
            tracking-[0.18em] text-[#07546B]
          "
        >
          Equipment category
        </p>

        <h3
          className="
            mb-3 font-['Manrope',system-ui,sans-serif]
            text-[clamp(1.5rem,2.2vw,2rem)]
            font-extrabold leading-[1.15]
            tracking-[-0.04em] text-[#102D3C]
          "
        >
          {category.name}
        </h3>

        {category.description && (
          <p
            className="
              mb-6 line-clamp-3
              text-[14px] leading-[1.8] text-[#63717a]
            "
          >
            {category.description}
          </p>
        )}

        <span
          className="
            inline-flex items-center gap-2
            text-sm font-bold text-[#07546B]
          "
        >
          Explore category
          <ArrowUpRight size={17} />
        </span>
      </div>
    </Link>
  );
}
