
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  ArrowUpRight,
  PackageSearch,
} from 'lucide-react';

import Reveal from '../animations/Reveal';
import {
  publishedProducts,
  type PublicProduct,
} from '../../services/publicCatalogue';
import { requireSupabase } from '../../lib/supabase/client';

type ProductWithImage = PublicProduct & {
  imageUrl: string | null;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const db = requireSupabase();

        // Fetch only real, published products.
        const allProducts = await publishedProducts();

        // Show up to 6 products.
        const selectedProducts = allProducts.slice(0, 6);

        if (selectedProducts.length === 0) {
          if (active) {
            setProducts([]);
            setError('');
          }
          return;
        }

        const productIds = selectedProducts.map(
          (product) => product.id
        );

        // Get uploaded product images from Supabase.
        const { data: media, error: mediaError } = await db
          .from('product_media')
          .select('product_id,storage_path,sort_order')
          .in('product_id', productIds)
          .eq('media_type', 'image')
          .order('sort_order', { ascending: true })
          .limit(100);

        if (mediaError) {
          throw mediaError;
        }

        const imageByProduct = new Map<string, string>();

        for (const item of media ?? []) {
          if (
            !item.storage_path ||
            item.storage_path.includes('..') ||
            imageByProduct.has(item.product_id)
          ) {
            continue;
          }

          const { data } = db.storage
            .from('product-public')
            .getPublicUrl(item.storage_path);

          imageByProduct.set(item.product_id, data.publicUrl);
        }

        const finalProducts = selectedProducts.map((product) => ({
          ...product,
          imageUrl: imageByProduct.get(product.id) ?? null,
        }));

        if (active) {
          setProducts(finalProducts);
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load products.'
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="
        relative isolate overflow-hidden
        bg-[#f7f9f9] text-[#0f1419]
        py-[clamp(90px,11vw,165px)]
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-[18%] top-[-25%]
          h-[65vw] w-[65vw] rounded-full
          bg-[radial-gradient(circle,rgba(13,92,79,0.06),transparent_65%)]
        "
      />

      <div className="container relative z-10 max-w-[1480px]">

        {/* SECTION HEADING */}
        <Reveal>
          <div
            className="
              mb-14 flex flex-col justify-between
              gap-8 lg:flex-row lg:items-end
            "
          >
            <div className="max-w-[950px]">

              {/* Eyebrow */}
              <div
                className="
                  mb-7 inline-flex items-center gap-3
                  rounded-full border border-[#0d5c4f]/15
                  bg-[#0d5c4f]/[0.04]
                  px-4 py-2
                "
              >
                <PackageSearch
                  size={15}
                  className="text-[#0d5c4f]"
                />

                <span
                  className="
                    text-[11px] font-bold uppercase
                    tracking-[0.20em] text-[#0d5c4f]
                  "
                >
                  DISCOVER EQUIPMENT
                </span>
              </div>

              {/* Heading */}
              <h2
                id="featured-heading"
                className="
                  m-0 font-['Manrope',system-ui,sans-serif]
                  text-[clamp(3rem,6.5vw,7rem)]
                  font-extrabold leading-[0.99]
                  tracking-[-0.065em] text-[#0f1419]
                "
              >
                Designed to make
                <br />
                <span className="text-[#0d5c4f]">
                  a difference.
                </span>
              </h2>

              <p
                className="
                  mt-7 max-w-[650px]
                  text-[clamp(1rem,1.5vw,1.25rem)]
                  leading-[1.8] text-[#596670]
                "
              >
                Explore medical equipment available in our published
                catalogue. View product details and submit your
                requirements for a quotation.
              </p>
            </div>

            {/* Explore all */}
            <Link
              to="/products"
              className="
                group inline-flex shrink-0 items-center gap-3
                self-start rounded-full
                border-2 border-[#0d5c4f]
                px-7 py-4 font-bold text-[#0d5c4f]
                transition-all duration-300
                hover:bg-[#0d5c4f] hover:text-white
              "
            >
              Explore Catalogue

              <ArrowRight
                size={19}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </Reveal>

        {/* LOADING */}
        {loading && (
          <div
            role="status"
            className="
              grid min-h-[300px] place-items-center
              rounded-[28px] border border-[#0f1419]/10
              bg-white
            "
          >
            <p className="text-[#596670]">
              Loading equipment…
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div
            role="alert"
            className="
              rounded-[28px] border border-red-200
              bg-red-50 px-8 py-12
            "
          >
            <p className="text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && products.length === 0 && (
          <div
            className="
              flex min-h-[300px] flex-col
              items-center justify-center
              rounded-[28px]
              border border-[#0d5c4f]/10
              bg-white px-8 text-center
            "
          >
            <PackageSearch
              size={38}
              strokeWidth={1.2}
              className="mb-5 text-[#0d5c4f]"
            />

            <h3 className="mb-3 text-2xl font-bold">
              Products coming soon
            </h3>

            <p className="max-w-md text-[#66747b]">
              Published medical equipment will appear here
              once products are added through the admin panel.
            </p>
          </div>
        )}

        {/* LIVE PRODUCT GRID */}
        {!loading && !error && products.length > 0 && (
          <div
            className="
              grid grid-cols-1 gap-6
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >
            {products.map((product, index) => (
              <Reveal
                key={product.id}
                delay={index * 0.06}
              >
                <Link
                  to={`/products/${product.slug}`}
                  className="
                    group flex h-full flex-col overflow-hidden
                    rounded-[28px]
                    border border-[#0f1419]/10
                    bg-white
                    transition-all duration-500
                    hover:-translate-y-2
                    hover:border-[#0d5c4f]/25
                    hover:shadow-[0_30px_70px_-25px_rgba(13,92,79,0.22)]
                  "
                >
                  {/* PRODUCT IMAGE */}
                  <div
                    className="
                      relative flex aspect-[4/3]
                      items-center justify-center
                      overflow-hidden bg-[#eef3f2]
                    "
                  >
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                        className="
                          h-full w-full object-contain
                          p-7 transition-transform duration-700
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <span
                        className="
                          text-xs font-semibold uppercase
                          tracking-[0.18em] text-[#82928e]
                        "
                      >
                        Image not uploaded
                      </span>
                    )}

                    <div
                      className="
                        absolute right-5 top-5
                        flex h-12 w-12 items-center justify-center
                        rounded-full bg-white/95 text-[#0d5c4f]
                        shadow-sm transition-all duration-300
                        group-hover:bg-[#0d5c4f]
                        group-hover:text-white
                      "
                    >
                      <ArrowUpRight size={21} />
                    </div>
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="flex flex-1 flex-col px-7 pb-8 pt-7">

                    <p
                      className="
                        mb-3 text-[11px] font-bold uppercase
                        tracking-[0.18em] text-[#0d5c4f]
                      "
                    >
                      MEDICAL EQUIPMENT
                    </p>

                    <h3
                      className="
                        mb-3 font-['Manrope',system-ui,sans-serif]
                        text-[clamp(1.4rem,2vw,1.85rem)]
                        font-extrabold leading-[1.2]
                        tracking-[-0.04em] text-[#0f1419]
                      "
                    >
                      {product.name}
                    </h3>

                    {product.summary && (
                      <p
                        className="
                          mb-6 line-clamp-3
                          text-[14px] leading-[1.8]
                          text-[#63717a]
                        "
                      >
                        {product.summary}
                      </p>
                    )}

                    <div className="mt-auto">
                      <p
                        className="
                          mb-5 text-xs
                          text-[#82928e]
                        "
                      >
                        SKU: {product.sku}
                      </p>

                      <span
                        className="
                          inline-flex items-center gap-2
                          text-sm font-bold text-[#0d5c4f]
                        "
                      >
                        View Product

                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
