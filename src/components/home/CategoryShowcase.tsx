
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Layers3 } from 'lucide-react';

import Reveal from '../animations/Reveal';
import { publishedCategories, type PublicCategory } from '../../services/publicCatalogue';
import CategoryTile from '../catalogue/CategoryTile';

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        const data = await publishedCategories();

        if (active) {
          setCategories(data.filter(category => !category.parent_id));
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load categories'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadCategories();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="
        relative isolate overflow-hidden
        bg-white text-[#102D3C]
        py-[clamp(90px,11vw,160px)]
      "
    >
      {/* Soft background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute right-[-18%] top-[-30%]
          h-[65vw] w-[65vw] rounded-full
          bg-[radial-gradient(circle,rgba(13,92,79,0.055),transparent_65%)]
        "
      />

      <div className="container relative z-10 max-w-[1480px]">

        {/* Section heading */}
        <Reveal>
          <div
            className="
              mb-14 flex flex-col justify-between
              gap-8 lg:flex-row lg:items-end
            "
          >
            <div className="max-w-[900px]">

              {/* Eyebrow */}
              <div
                className="
                  mb-7 inline-flex items-center gap-3
                  rounded-full border border-[#07546B]/15
                  bg-[#07546B]/[0.04]
                  px-4 py-2
                "
              >
                <Layers3
                  size={15}
                  className="text-[#07546B]"
                />

                <span
                  className="
                    text-[11px] font-bold uppercase
                    tracking-[0.20em] text-[#07546B]
                  "
                >
                  EXPLORE OUR CATALOGUE
                </span>
              </div>

              {/* Big heading */}
              <h2
                id="categories-heading"
                className="
                  m-0 font-['Manrope',system-ui,sans-serif]
                  text-[clamp(3rem,6.5vw,7rem)]
                  font-extrabold leading-[0.99]
                  tracking-[-0.065em] text-[#102D3C]
                "
              >
                Equipment for
                <br />
                <span className="text-[#07546B]">
                  every environment.
                </span>
              </h2>

              <p
                className="
                  mt-7 max-w-[620px]
                  text-[clamp(1rem,1.5vw,1.25rem)]
                  leading-[1.8] text-[#596670]
                "
              >
                Explore medical equipment categories for hospitals,
                critical care, laboratories and diagnostic facilities.
              </p>
            </div>

            {/* View all link */}
            <Link
              to="/categories"
              className="
                group inline-flex shrink-0 items-center gap-3
                self-start rounded-full
                border-2 border-[#07546B]
                px-7 py-4 font-bold text-[#07546B]
                transition-all duration-300
                hover:bg-[#07546B] hover:text-white
              "
            >
              All Categories

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

        {/* Database categories */}
        {loading ? (
          <div
            role="status"
            className="
              grid min-h-[300px] place-items-center
              rounded-[28px] border border-[#102D3C]/10
              bg-[#f8faf9]
            "
          >
            <p className="text-[#596670]">
              Loading equipment categories…
            </p>
          </div>
        ) : error ? (
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
        ) : categories.length === 0 ? (
          <div
            className="
              flex min-h-[300px] flex-col
              items-center justify-center
              rounded-[28px]
              border border-[#07546B]/10
              bg-[#F1F7FA] px-8 text-center
            "
          >
            <Layers3
              size={35}
              strokeWidth={1.3}
              className="mb-5 text-[#07546B]"
            />

            <h3 className="mb-3 text-2xl font-bold text-[#102D3C]">
              Categories coming soon
            </h3>

            <p className="max-w-md text-[#66747b]">
              Equipment categories will appear here once
              they are published in the catalogue.
            </p>
          </div>
        ) : (
          <div
            className="
              grid grid-cols-1 gap-6
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >
            {categories.slice(0, 6).map((category, index) => (
              <Reveal
                key={category.id}
                delay={index * 0.06}
              >
                <CategoryTile category={category} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Bottom link */}
        {categories.length > 6 && (
          <div className="mt-12 flex justify-center">
            <Link
              to="/categories"
              className="
                group inline-flex items-center gap-3
                text-base font-bold text-[#07546B]
              "
            >
              Explore all equipment categories

              <ArrowUpRight
                size={20}
                className="
                  transition-transform
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
