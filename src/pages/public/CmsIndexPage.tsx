
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowUpRight,
  CalendarDays,
  FileText,
} from 'lucide-react';

import BlogPage from './BlogPage';
import { useDocumentMeta } from '../../seo/useDocumentMeta';
import CmsContentCard from '../../components/public/cms/CmsContentCard';
import { listCmsPublic } from '../../services/cmsPublic';
import type { CmsEntry, CmsKind } from '../../types/cms';

import '../../styles/resources-theme.css';

type CmsIndexPageProps = {
  kind: CmsKind;
  title: string;
};

export default function CmsIndexPage({
  kind,
  title,
}: CmsIndexPageProps) {
  if (kind === 'blog') {
    return <BlogPage />;
  }

  return <CmsIndexOther kind={kind} title={title} />;
}

function CmsIndexOther({
  kind,
  title,
}: CmsIndexPageProps) {
  const canonicalPath =
    kind === 'case_study'
      ? '/case-studies'
      : '/resources';

  useDocumentMeta({
    title: `${title} | ConXport`,
    description: `Explore published ${title.toLowerCase()} from ConXport. Discover information, guides and insights on medical and hospital equipment.`,
    canonicalPath,
  });

  const [items, setItems] = useState<CmsEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError('');
    setItems([]);

    void listCmsPublic(kind)
      .then((rows) => {
        if (active) {
          setItems(rows);
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load content.'
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [kind]);

  const isResource = kind === 'resource';

  const eyebrow = isResource
    ? 'CONXPORT / RESOURCES'
    : 'CONXPORT / CASE STUDIES';

  const description = isResource
    ? 'Explore useful information, practical guides and industry insights to help you understand hospital, medical and laboratory equipment.'
    : 'Explore ConXport case studies, project experiences and practical insights from the healthcare equipment industry.';

  const contentLabel = isResource
    ? 'Explore Resources'
    : 'Explore Case Studies';

  const countLabel = isResource
    ? items.length === 1
      ? 'Resource'
      : 'Resources'
    : items.length === 1
      ? 'Case Study'
      : 'Case Studies';

  return (
    <main className="cx-resources min-h-[70vh] bg-white text-[#043C50]">

      {/* =============================== */}
      {/* HERO SECTION                    */}
      {/* =============================== */}

      <section className="relative overflow-hidden border-b border-[#E8ECEE] bg-[#FAFBFC]">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#FCEDE6] opacity-50 blur-[100px]" />

        <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12 lg:pb-24 lg:pt-20">

          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#71838B]"
          >
            <Link
              to="/"
              className="!text-[#657A80] transition-colors hover:!text-[#D84312]"
            >
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <span className="font-semibold !text-[#D84312]">
              {title}
            </span>
          </nav>

          {/* Eyebrow */}

          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#D84312]" />

            <span className="font-['Manrope',sans-serif] text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#D84312] sm:text-[12px]">
              {eyebrow}
            </span>
          </div>

          {/* Premium Serif Heading */}

          <h1 className="cx-display-title !m-0 max-w-[1050px] !text-[clamp(2.7rem,5.3vw,5.3rem)]">

            {isResource ? (
              <>
                Explore our{' '}
                <em className="!text-[#D84312]">
                  Resources.
                </em>
              </>
            ) : (
              <>
                Discover our{' '}
                <em className="!text-[#D84312]">
                  Case Studies.
                </em>
              </>
            )}

          </h1>

          {/* Description */}

          <p className="!mb-0 !mt-7 max-w-[730px] font-['Manrope',sans-serif] !text-[15px] !leading-[1.9] !text-[#657A80] sm:!text-[17px]">
            {description}
          </p>

          {/* Hero Bottom Detail */}

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">

            <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#657A80]">
              <FileText
                size={16}
                className="text-[#D84312]"
                aria-hidden="true"
              />
              Knowledge & Insights
            </span>

            <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#657A80]">
              <CalendarDays
                size={16}
                className="text-[#D84312]"
                aria-hidden="true"
              />
              Healthcare Industry
            </span>

          </div>
        </div>
      </section>

      {/* =============================== */}
      {/* RESOURCE LISTING                */}
      {/* =============================== */}

      <section className="mx-auto w-full max-w-[1320px] px-5 pb-10 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">

        {/* Section Heading */}

        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">

          <div>
            <p className="!mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] !text-[#D84312]">
              CONXPORT KNOWLEDGE HUB
            </p>

            <h2 className="cx-display-title !m-0 !text-[clamp(2rem,3.5vw,3.5rem)]">
              {isResource ? (
                <>
                  Latest{' '}
                  <em className="!text-[#D84312]">
                    Resources.
                  </em>
                </>
              ) : (
                <>
                  Featured{' '}
                  <em className="!text-[#D84312]">
                    Case Studies.
                  </em>
                </>
              )}
            </h2>

            <p className="!mb-0 !mt-3 max-w-[650px] !text-[14px] !leading-[1.8] !text-[#657A80] sm:!text-[15px]">
              {isResource
                ? 'Discover useful content, product knowledge and practical information.'
                : 'Explore published projects, experiences and industry insights.'}
            </p>
          </div>

          {!loading && !error && items.length > 0 && (
            <span className="rounded-full border border-[#E7ECEE] bg-[#F1F7FA] px-4 py-2 text-[12px] font-bold text-[#043C50]">
              {items.length} {countLabel}
            </span>
          )}

        </div>

        {/* Error State */}

        {error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-6 py-7 text-sm text-red-700"
          >
            <p className="!m-0 font-semibold">
              Unable to load {title.toLowerCase()}.
            </p>

            <p className="!mb-0 !mt-2">
              {error}
            </p>
          </div>
        ) : loading ? (

          /* Loading Skeleton */

          <div
            role="status"
            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                aria-hidden="true"
                className="overflow-hidden rounded-[22px] border border-[#E4ECEF] bg-white"
              >
                <div className="aspect-[16/10] animate-pulse bg-[#F1F7FA]" />

                <div className="space-y-4 p-6">
                  <div className="h-3 w-28 animate-pulse rounded bg-[#E7ECEE]" />
                  <div className="h-6 w-5/6 animate-pulse rounded bg-[#E7ECEE]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#E7ECEE]" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-[#E7ECEE]" />
                </div>
              </div>
            ))}

            <span className="sr-only">
              Loading {title.toLowerCase()}...
            </span>
          </div>

        ) : items.length === 0 ? (

          /* Empty State */

          <div className="rounded-[24px] border border-[#E4ECEF] bg-[#F8FAFB] px-6 py-20 text-center">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF1EB]">
              <FileText
                size={29}
                className="text-[#D84312]"
                aria-hidden="true"
              />
            </div>

            <h3 className="cx-display-title !m-0 !text-[clamp(1.8rem,3vw,2.6rem)]">
              More content{' '}
              <em className="!text-[#D84312]">
                coming soon.
              </em>
            </h3>

            <p className="!mb-0 !mt-4 text-[14px] text-[#657A80]">
              New content will appear here when published.
            </p>

          </div>

        ) : (

          /* CMS Cards */

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <CmsContentCard
                key={item.id}
                item={item}
              />
            ))}
          </div>

        )}

      </section>

      {/* =============================== */}
      {/* CONTACT CTA                     */}
      {/* =============================== */}

      <section className="mx-auto w-full max-w-[1320px] px-5 pb-20 pt-8 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">

        <div className="cx-cta relative overflow-hidden border border-[#E4ECEF] bg-[#F8FAFB] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FCEDE6] opacity-60 blur-[70px]" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-[790px]">

              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#D84312]" />

                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#D84312]">
                  LET'S CONNECT
                </span>
              </div>

              <h2 className="cx-display-title !m-0 !text-[clamp(2rem,3.5vw,3.7rem)]">

                Have a medical equipment{' '}
                <em className="!text-[#D84312]">
                  requirement?
                </em>

              </h2>

              <p className="!mb-0 !mt-5 max-w-[620px] font-['Manrope',sans-serif] !text-[14px] !leading-[1.85] !text-[#657A80] sm:!text-[15px]">
                Connect with ConXport to discuss your medical equipment, laboratory equipment or healthcare infrastructure requirements.
              </p>

            </div>

            {/* CTA Button */}

            <Link
              to="/contact"
              className="cx-cta-button group inline-flex min-h-[52px] shrink-0 items-center justify-center gap-3 self-start rounded-full !bg-[#D84312] px-7 py-4 text-[13px] font-extrabold !text-white no-underline transition-all duration-300 hover:-translate-y-1 hover:!bg-[#043C50] sm:px-9 sm:text-[14px] lg:self-center"
            >
              Contact ConXport

              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

          </div>
        </div>

        {/* Catalogue Link */}

        <div className="mt-10 flex justify-center">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-[13px] font-bold !text-[#043C50] transition-colors hover:!text-[#D84312]"
          >
            Explore Equipment Catalogue

            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

      </section>

      {/* Accessibility label */}

      <span className="sr-only">
        {contentLabel}
      </span>

    </main>
  );
}
