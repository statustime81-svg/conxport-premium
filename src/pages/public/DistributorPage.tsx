import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Building2, CheckCircle2, Globe2, MapPin, PackageSearch, ShieldCheck, Truck } from 'lucide-react';
import { useDocumentMeta } from '../../seo/useDocumentMeta';

/** Locations are transcribed from the supplied ConXport distributor-network PDF.
 * The PDF does not identify the names, addresses or contact details of local distributors.
 */
const coverage = [
  { name: 'Jammu', zone: 'North' },
  { name: 'Chandigarh', zone: 'North' },
  { name: 'Sonipat', zone: 'North' },
  { name: 'Delhi', zone: 'North' },
  { name: 'Rajasthan', zone: 'West' },
  { name: 'Kanpur', zone: 'North' },
  { name: 'Patna', zone: 'East' },
  { name: 'Guwahati', zone: 'North-East' },
  { name: 'Jabalpur', zone: 'Central' },
  { name: 'Ranchi', zone: 'East' },
  { name: 'Nagpur', zone: 'Central' },
  { name: 'Raipur', zone: 'Central' },
  { name: 'Bhubaneswar', zone: 'East' },
  { name: 'Pune', zone: 'West' },
  { name: 'Hyderabad', zone: 'South' },
  { name: 'Chennai', zone: 'South' },
] as const;

const regions = [
  { name: 'North India', description: 'Jammu, Chandigarh, Sonipat, Delhi and Kanpur', zone: 'North' },
  { name: 'East India', description: 'Patna, Ranchi and Bhubaneswar', zone: 'East' },
  { name: 'Central India', description: 'Jabalpur, Nagpur and Raipur', zone: 'Central' },
  { name: 'West India', description: 'Rajasthan and Pune', zone: 'West' },
  { name: 'South India', description: 'Hyderabad and Chennai', zone: 'South' },
  { name: 'North-East India', description: 'Guwahati', zone: 'North-East' },
] as const;

export default function DistributorPage() {
  useDocumentMeta({
    title: 'Distributor Network in India | ConXport',
    description: 'Explore the locations marked on the ConXport distributor network map and contact us for medical, hospital and laboratory equipment enquiries.',
    canonicalPath: '/distributor',
  });

  return (
    <main className="min-h-screen bg-white font-['Manrope',system-ui,sans-serif] !text-[#043C50]">
      {/* Page-specific styles only. No changes to the global design system. */}
      <section className="relative isolate overflow-hidden bg-[#FFFCF9]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-52 h-[500px] w-[500px] rounded-full bg-[#d8efeb]/60 blur-[90px]" />
        <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 px-5 pb-14 pt-16 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-16 lg:px-10 lg:pb-20 lg:pt-24">
          <div className="max-w-xl">
            <p className="!mb-5 inline-flex items-center gap-2 rounded-full border border-[#c8e4df] bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[.13em] !text-[#0b655a]">
              <Globe2 size={15} /> ConXport Network
            </p>
            <h1 className="!mb-5 !font-['DM_Serif_Display',Georgia,serif] !font-normal !text-[clamp(2.6rem,4.9vw,4.9rem)] !font-normal !leading-[1.08] !tracking-[-.055em] !text-[#043C50]">
              Connecting healthcare needs <span className="italic !text-[#D84312]">across India.</span>
            </h1>
            <p className="!mb-0 max-w-lg !text-[15px] !leading-8 !text-[#587079] sm:!text-[16px]">
              Explore the locations highlighted on our distributor network map. ConXport supports enquiries for hospital furniture, medical equipment, surgical instruments and laboratory solutions, helping institutions find the right product information and quotation support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full !bg-[#D84312] px-6 text-sm font-bold !text-white transition hover:!bg-[#B9320A]">
                Contact our team <ArrowUpRight size={17}/>
              </Link>
              <a href="#network-locations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#cddbdc] bg-white px-6 text-sm font-bold !text-[#18373e] transition hover:border-[#07546B]">
                Explore locations <ArrowRight size={17}/>
              </a>
            </div>
            <p className="!mb-0 mt-6 text-xs !leading-6 !text-[#71868c]">Coverage markers are based on the supplied ConXport network map. Confirm current distributor availability with our team.</p>
          </div>

          <div className="relative min-w-0">
            <div className="absolute -inset-3 rounded-[32px] border border-[#dae9e7] bg-white/50" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[26px] border border-[#e3edec] bg-white p-3 shadow-[0_22px_70px_-35px_rgba(6,46,46,.24)] sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
                <div>
                  <p className="!mb-1 text-[11px] font-extrabold uppercase tracking-[.17em] !text-[#D84312]">Network at a glance</p>
                  <p className="!mb-0 text-[15px] font-extrabold !text-[#18333b]">India distributor location map</p>
                </div>
                <span className="rounded-full bg-[#e5f5f0] px-3 py-1.5 text-xs font-extrabold !text-[#07546B]">16 map markers</span>
              </div>
              <img src="/images/distributor/conxport-distributor-network.webp" alt="ConXport distributor network map showing 16 marked locations across India" className="mx-auto block max-h-[650px] w-full object-contain" loading="eager" decoding="async" />
              <p className="!mb-0 mt-3 px-1 text-xs !leading-5 !text-[#778991]">Source: ConXport distributor network PDF supplied for this page.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="network-locations" aria-labelledby="network-heading" className="mx-auto w-full max-w-[1280px] scroll-mt-28 px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="!mb-3 text-xs font-extrabold uppercase tracking-[.16em] !text-[#D84312]">Regional coverage</p>
            <h2 id="network-heading" className="!mb-3 !font-['DM_Serif_Display',Georgia,serif] !font-normal !text-[clamp(1.8rem,3.2vw,2.8rem)] !font-extrabold !tracking-[-.04em] !text-[#043C50]">Explore our distributor <em className="italic !text-[#D84312]">network.</em></h2>
            <p className="!mb-0 !text-sm !leading-7 !text-slate-600">Find locations referenced in the ConXport network map, grouped for easier browsing.</p>
          </div>
          <span className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold !text-slate-500">6 geographic regions</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <article key={region.zone} className="group rounded-2xl border border-[#e3ebec] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b4d8d2] hover:shadow-[0_15px_35px_-25px_rgba(11,88,75,.3)]">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f6f3] !text-[#0d6d60]"><MapPin size={20}/></div>
              <h3 className="!mb-2 !text-[17px] !font-extrabold !text-[#17323b]">{region.name}</h3>
              <p className="!mb-0 !text-[13px] !leading-6 !text-[#60737b]">{region.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-9 rounded-2xl border border-[#dce9e6] bg-[#F1F7FA] p-5 sm:p-7">
          <h3 className="!mb-4 !text-[16px] !font-extrabold !text-[#17343b]">All marked locations</h3>
          <ul className="flex flex-wrap gap-2.5">
            {coverage.map((place) => (
              <li key={place.name} className="inline-flex items-center gap-2 rounded-full border border-[#dce9e6] bg-white px-3.5 py-2 text-[12px] font-bold !text-[#355660]">
                <MapPin size={13} className="text-[#0c8876]" /> {place.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#FFF9F5] py-16 lg:py-20" aria-labelledby="support-heading">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="!mb-3 text-xs font-extrabold uppercase tracking-[.16em] !text-[#D84312]">How we can help</p>
            <h2 id="support-heading" className="!mb-3 !font-['DM_Serif_Display',Georgia,serif] !font-normal !text-[clamp(1.8rem,3vw,2.6rem)] !font-extrabold !tracking-tight !text-[#043C50]">Product and distribution <em className="italic !text-[#D84312]">enquiries.</em></h2>
            <p className="!mb-0 !text-sm !leading-7 !text-[#60737b]">Share your product category, location and requirements. Our team can guide you through the next steps.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: PackageSearch, title: 'Product selection', copy: 'Explore suitable hospital, medical and laboratory equipment for your intended use.' },
              { icon: ShieldCheck, title: 'Product documentation', copy: 'Request available specifications, product details and supporting documentation before deciding.' },
              { icon: Truck, title: 'Supply enquiries', copy: 'Discuss destination, required quantities, delivery considerations and quotation requirements.' },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-2xl border border-[#e4eded] bg-white p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6f2] !text-[#0c7566]"><Icon size={22}/></div>
                <h3 className="!mb-3 !text-lg !font-extrabold !text-[#18343d]">{title}</h3>
                <p className="!mb-0 !text-sm !leading-7 !text-[#647780]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="relative overflow-hidden rounded-[28px] bg-[#103d3d] px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14 lg:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border-[50px] border-white/5" />
          <div className="relative max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.15em] !text-[#9fe3ce]"><Building2 size={15} /> Distribution enquiries</div>
            <h2 className="!mb-3 !font-['DM_Serif_Display',Georgia,serif] !font-normal !text-[clamp(1.8rem,3vw,2.6rem)] !font-extrabold !tracking-tight !text-white">Need a distributor contact or <em className="italic !text-[#FFAD91]">equipment quotation?</em></h2>
            <p className="!mb-0 !text-sm !leading-7 !text-[#d5e8e4]">Tell us your city, the equipment you need and your expected quantity. ConXport can confirm the appropriate enquiry channel and available next steps.</p>
          </div>
          <div className="relative mt-7 flex shrink-0 flex-wrap gap-3 lg:mt-0">
            <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl !bg-white px-5 text-sm font-extrabold !text-[#10493f] transition hover:!bg-[#e6f6ef]">Contact ConXport <ArrowUpRight size={17}/></Link>
            <Link to="/products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/40 px-5 text-sm font-bold !text-white transition hover:bg-white/10">Browse products <ArrowRight size={17}/></Link>
          </div>
        </div>
        <p className="!mb-0 mt-5 text-center text-xs !text-[#7e8f95]"><CheckCircle2 size={14} className="mr-1 inline-block align-[-2px]" /> Distributor names, phone numbers and live availability are not provided in the reference map. Confirm details directly with ConXport.</p>
      </section>
    </main>
  );
}
