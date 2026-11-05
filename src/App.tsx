
import { lazy, Suspense } from 'react';
import { Link } from 'react-router';
import {
 
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

import { useDocumentMeta } from './seo/useDocumentMeta';
import { websiteSchema } from './seo/structuredData';

import HeroSection from './components/home/HeroSection';
import CategoryShowcase from './components/home/CategoryShowcase';

import HomepageCmsSection from './components/public/cms/HomepageCmsSection';
import Reveal from './components/animations/Reveal';
import { ManagedClients, ManagedTestimonials, ManagedFaq } from './components/home/ManagedShowcase';
import LatestProducts from './components/home/LatestProducts';
import HomepageContactSection from './components/home/HomepageContactSection';

const SmoothScroll = lazy(
  () => import('./components/animations/SmoothScroll')
);

// Replace these images with real hospital photos later.
const benefits = [
  {
    number: '01',
    image: '/images/why-conxport/healthcare.png',
    title: 'Built for healthcare',
    description:
      'A professional equipment discovery experience for hospitals, diagnostic centres, laboratories and healthcare institutions.',
  },
  {
    number: '02',
    image: '/images/why-conxport/sourcing.png',
    title: 'Simplified sourcing',
    description:
      'Explore medical equipment categories, compare available information and communicate your procurement requirements.',
  },
  {
    number: '03',
    image: '/images/why-conxport/clarity.png',
    title: 'Clarity at every step',
    description:
      'Request specifications, product documentation and quotations to support more informed equipment decisions.',
  },
];

function WhyConXportSection() {
  return (
    <section
      id="why-conxport"
      aria-labelledby="why-conxport-heading"
      className="
        relative isolate overflow-hidden
        bg-white text-[#101b22]
        pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-[15%] -top-[20%]
          h-[700px] w-[700px] rounded-full
          bg-[radial-gradient(circle,rgba(13,92,79,0.055),transparent_65%)]
        "
      />

      <div
        className="
          relative z-10 mx-auto
          w-[min(1440px,calc(100%-40px))]
        "
      >
        {/* SECTION HEADING */}
        <div
          className="
            grid grid-cols-1 gap-8
            lg:grid-cols-[1.4fr_0.6fr]
            lg:items-end lg:gap-16
          "
        >
          <Reveal>
            <div>
              <div
                className="
                  mb-7 inline-flex items-center gap-3
                  rounded-full
                  border border-[#07546B]/15
                  bg-[#edf6f3] px-5 py-2.5
                "
              >
                <CheckCircle2
                  size={16}
                  strokeWidth={2}
                  className="text-[#07546B]"
                />

                <span
                  className="
                    text-[11px] font-extrabold uppercase
                    tracking-[0.18em] text-[#07546B]
                  "
                >
                  WHY CONXPORT
                </span>
              </div>

              <h2
                id="why-conxport-heading"
                className="
                  m-0 max-w-[1100px]
                  font-['Manrope',system-ui,sans-serif]
                  text-[clamp(3rem,6vw,6.5rem)]
                  font-extrabold leading-[1.05]
                  tracking-[-0.065em] text-[#101b22]
                "
              >
                Healthcare procurement
                <br className="hidden sm:block" />
                <span className="text-[#07546B]">
                  {' '}deserves clarity.
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:pb-3">
              <div
                className="
                  mb-5 h-[3px] w-14
                  rounded-full bg-[#07546B]
                "
              />

              <p
                className="
                  m-0 max-w-[440px]
                  text-[clamp(16px,1.3vw,19px)]
                  leading-[1.85] text-[#5e6c74]
                "
              >
                Better equipment decisions begin with better
                information. We make medical equipment
                discovery and enquiries more straightforward.
              </p>
            </div>
          </Reveal>
        </div>

        {/* THREE IMAGE CARDS */}
        <div
          className="
            mt-9
            grid grid-cols-1 gap-6
            md:grid-cols-3
            lg:mt-12
          "
        >
          {benefits.map(
            ({ number, image, title, description }, index) => (
              <Reveal key={number} delay={index * 0.08}>
                <article
                  className="
                    group flex h-full flex-col
                    overflow-hidden rounded-[28px]
                    border border-[#dde7e5]
                    bg-white
                    transition-all duration-500
                    hover:-translate-y-2
                    hover:border-[#07546B]/30
                    hover:shadow-[0_30px_75px_-30px_rgba(13,92,79,0.28)]
                  "
                >
                  {/* IMAGE AREA */}
                  <div
                    className="
                      relative aspect-[16/11]
                      overflow-hidden bg-[#edf5f3]
                    "
                  >
                    <img
                      src={image}
                      alt={title}
                      loading="lazy"
                      className="
                        h-full w-full object-cover
                        transition-transform duration-700
                        group-hover:scale-105
                      "
                    />

                    {/* Number badge */}
                    <div
                      className="
                        absolute left-6 top-6
                        flex h-12 w-12 items-center
                        justify-center rounded-full
                        border border-white/70
                        bg-white/95 text-sm
                        font-extrabold text-[#07546B]
                        shadow-md backdrop-blur-md
                      "
                    >
                      {number}
                    </div>

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none absolute inset-0
                        bg-gradient-to-t
                        from-[#0b3834]/20
                        via-transparent to-transparent
                      "
                    />
                  </div>

                  {/* CARD DETAILS */}
                  <div
                    className="
                      flex flex-1 flex-col
                      px-7 pb-9 pt-8
                      sm:px-9 sm:pb-10
                    "
                  >
                    <h3
                      className="
                        mb-4
                        font-['Manrope',system-ui,sans-serif]
                        text-[clamp(24px,2.2vw,32px)]
                        font-extrabold leading-[1.2]
                        tracking-[-0.05em]
                        text-[#101b22]
                      "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                        mb-0 text-[15px]
                        leading-[1.85] text-[#617078]
                      "
                    >
                      {description}
                    </p>

                    <div className="mt-auto pt-8">
                      <div
                        className="
                          h-[3px] w-14 rounded-full
                          bg-[#07546B]
                          transition-all duration-500
                          group-hover:w-full
                        "
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          )}
        </div>

        {/* BOTTOM LINK */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="
              group inline-flex items-center gap-3
              text-sm font-extrabold text-[#07546B]
              transition-colors duration-300
              hover:text-[#083c35]
            "
          >
            Explore our equipment catalogue

            <ArrowUpRight
              size={19}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useDocumentMeta(
    {
      title: 'ConXport | Medical Equipment & Institutional Enquiries',
      description:
        'Explore hospital and laboratory equipment and request tailored quotations.',
      canonicalPath: '/',
    },
    websiteSchema()
  );

  return (
    <Suspense fallback={<main><HeroSection /></main>}>
      <SmoothScroll>
        <div className="home-content">
          <HeroSection />
          <ManagedClients />
          <CategoryShowcase />
       
          <HomepageCmsSection slug="main" />
          <WhyConXportSection />
          <section className="bg-[#f3f8fb] py-20 sm:py-24" id="latest-products">
            <div className="container">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <div><p className="text-xs font-extrabold uppercase tracking-[.18em] !text-[#07546B]">From our catalogue</p><h2 className="mt-3 text-3xl font-extrabold !text-[#101b22] sm:text-4xl">Our Latest Products</h2><p className="mt-3 !text-slate-600">Recently published hospital and laboratory equipment.</p></div>
                <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-[#07546B] px-6 py-3 font-bold !text-white transition hover:-translate-y-1 hover:bg-[#053F52]">All products <ArrowUpRight size={17}/></Link>
              </div>
              <LatestProducts />
            </div>
          </section>
          <ManagedTestimonials />
          <ManagedFaq />
          <HomepageContactSection />
        </div>
      </SmoothScroll>
    </Suspense>
  );
}
