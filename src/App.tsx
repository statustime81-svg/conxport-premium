
import { lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

import { useDocumentMeta } from './seo/useDocumentMeta';
import { websiteSchema } from './seo/structuredData';

import HeroSection from './components/home/HeroSection';
import HomeAboutSection from './components/home/HomeAboutSection';
import HomeServicesSection from './components/home/HomeServicesSection';
import WhyConXportSection from './components/home/WhyConXportSection';
import CategoryShowcase from './components/home/CategoryShowcase';

import HomepageCmsSection from './components/public/cms/HomepageCmsSection';

import { ManagedClients, ManagedTestimonials, ManagedFaq } from './components/home/ManagedShowcase';
import LatestProducts from './components/home/LatestProducts';
import HomepageContactSection from './components/home/HomepageContactSection';

const SmoothScroll = lazy(
  () => import('./components/animations/SmoothScroll')
);

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
          <HomeAboutSection />
          <HomeServicesSection />
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
