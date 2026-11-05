import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Boxes, Factory, Settings2,
  Microscope, Headset, Scale, Handshake, Mail, MapPin, Phone, HeartPulse,
} from 'lucide-react';
import Reveal from '../../components/animations/Reveal';
import { useDocumentMeta } from '../../seo/useDocumentMeta';

const strengths = [
  { number: '01', icon: Boxes, title: 'ConXport Extensive Product Portfolio', description: 'We offer a wide range of laboratory and medical equipment to meet diverse needs. Our product portfolio includes hospital furniture, medical equipment, instruments, apparatus, consumables, reagents, diagnostic tools, and more. We continually update our offerings to keep pace with the latest advancements in technology and industry trends.' },
  { number: '02', icon: Factory, title: 'ConXport Manufacturing Excellence', description: 'As a manufacturer, we have an in-house production facility equipped with state-of-the-art machinery and a skilled workforce. This allows us to control the entire manufacturing process, ensuring superior quality, adherence to industry standards, and timely delivery of products.' },
  { number: '03', icon: Settings2, title: 'ConXport Customization Capabilities', description: 'We understand that each laboratory or healthcare facility may have unique requirements. That’s why we offer customization options to tailor our equipment to specific needs. Our experienced team works closely with clients, providing consultation and expert guidance to design and develop customized solutions that align with their goals.' },
  { number: '04', icon: BadgeCheck, title: 'ConXport Quality Assurance', description: 'Quality is at the core of everything we do. We implement stringent quality control measures at every stage of manufacturing and sourcing. Our products undergo rigorous testing to ensure accuracy, precision, reliability, and compliance with relevant regulatory standards. We are committed to delivering products that meet or exceed our customers’ expectations.' },
  { number: '05', icon: Microscope, title: 'ConXport Research and Development', description: 'We invest in research and development to stay at the forefront of technological advancements in the laboratory and medical equipment industry. Our dedicated R&D team continuously explores new concepts, conducts feasibility studies, and collaborates with experts to develop innovative solutions that address emerging needs.' },
  { number: '06', icon: Headset, title: 'ConXport Service and Support', description: 'We believe in building long-term relationships with our customers. Our commitment to exceptional customer service extends beyond the initial purchase. We provide comprehensive support, including installation, training, maintenance, calibration, and prompt assistance for any technical queries or issues that may arise.' },
  { number: '07', icon: Scale, title: 'ConXport Compliance and Ethical Practices', description: 'We prioritize compliance with regulatory standards and ethical business practices. Our products are manufactured following strict quality assurance guidelines and adhere to relevant industry regulations. We strive to conduct business with integrity, transparency, and a strong sense of corporate responsibility.' },
  { number: '08', icon: Handshake, title: 'ConXport Collaboration and Partnerships', description: 'We foster collaborations and partnerships with leading institutions, research organizations, and healthcare professionals. These collaborations enable us to gain valuable insights, exchange knowledge, and continuously improve our offerings to meet the evolving needs of the industry.' },
];

const productGroups = [
  'Anaesthesia Products', 'Autoclaves & Sterilizers', 'Autopsy Products', 'Baby Care',
  'Biohazard Products', 'Blood Bank', 'Cold Chain Equipments', 'Dental',
  'Diagnostic', 'General Products', 'Hospital Furniture', 'Garments', 'Holloware',
  'Scales', 'ICU Equipments', 'Medical Disposables', 'Imaging Products',
  'Medical Kits', 'Rubber Products', 'Safety Products', 'Operation Theatre Table & Light',
  'Ophthalmic', 'Orthopaedic', 'Surgical Instruments', 'Pathology',
  'Pharmacy Equipments', 'Physiotherapy', 'Rehabilitation Products',
  'Suction Machines', 'Surgical Sets',
];


const sectionLabel = 'text-[11px] font-extrabold uppercase tracking-[0.20em] text-[#0d7565]';
const bodyText = 'text-[15px] leading-[1.85] text-[#596e76] sm:text-[16px]';

export default function AboutPage() {
  const [email, setEmail] = useState('');

  useDocumentMeta({
    title: 'About Us | ConXport Medical & Laboratory Equipment',
    description: 'Learn about Contemporary Export Industries (ConXport), our medical equipment portfolio, manufacturing, quality, network and vision.',
    canonicalPath: '/about',
  });

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Newsletter automation is not connected. Open a prefilled email request instead.
    const subject = encodeURIComponent('ConXport newsletter subscription request');
    const message = encodeURIComponent(`Please add this email to your newsletter list: ${email}`);
    window.location.href = `mailto:trehan.akhil@yahoo.com?subject=${subject}&body=${message}`;
  }

  return (
    <main className="w-full overflow-hidden bg-white font-sans text-[#102b33]">
      {/* INTRO: editorial split, moderate image height */}
      <section className="relative bg-[linear-gradient(115deg,#f6faf9_0%,#ffffff_72%)] py-12 sm:py-16 lg:py-[76px]">
        <div className="container mx-auto grid max-w-[1340px] items-center gap-10 lg:grid-cols-[1.12fr_.88fr] lg:gap-16">
          <Reveal>
            <div>
              <p className={sectionLabel}>ABOUT CONTEMPORARY EXPORT INDUSTRIES</p>
              <h1 className="mt-5 max-w-[780px] !font-sans text-[clamp(2.4rem,5vw,4.8rem)] font-extrabold leading-[1.09] tracking-[-.055em] !text-[#102b33]">
                Medical equipment. <span className="text-[#0d695c]">Built around healthcare.</span>
              </h1>
              <p className={`mt-7 max-w-[720px] ${bodyText}`}>
                ConXport is a leading supplier and manufacturer of laboratory and medical equipment. With a commitment to innovation, quality, and customer satisfaction, we specialize in providing a comprehensive range of cutting-edge equipment and solutions to healthcare institutions, research laboratories, and educational facilities.
              </p>
              <p className={`mt-4 max-w-[720px] ${bodyText}`}>
                With a deep understanding of the unique needs and challenges of the healthcare industry, we strive to deliver products that enhance patient comfort, support healthcare professionals, and contribute to the overall efficiency of healthcare environments.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/products" className="group inline-flex items-center gap-2 rounded-full bg-[#07546B] px-6 py-3.5 text-sm font-bold !text-white transition hover:-translate-y-0.5 hover:bg-[#053F52]">Explore Products <ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#cbded8] bg-white px-6 py-3.5 text-sm font-bold !text-[#07546B] transition hover:bg-[#E7F5F7]">Contact Us <ArrowRight size={16} /></Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[24px] bg-[#e9f3f0] shadow-[0_18px_50px_rgba(6,52,46,.09)]">
              <img src="/images/why-conxport/healthcare.png" alt="Hospital healthcare equipment and facility" className="h-[270px] w-full object-cover sm:h-[380px] lg:h-[440px]" />
              <div className="flex items-center gap-3 border-t border-[#d6e8e1] bg-white px-6 py-4 text-[13px] font-bold text-[#07546B]"><HeartPulse size={19} /> Contemporary Export Industries · Medical & Laboratory Equipment</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8 STRENGTHS: compact information rows, not giant cards */}
      <section className="bg-white py-14 sm:py-[76px]" aria-labelledby="about-strengths-title">
        <div className="container mx-auto max-w-[1300px]">
          <Reveal>
            <div className="max-w-[850px]">
              <p className={sectionLabel}>WHY CONXPORT</p>
              <h2 id="about-strengths-title" className="mt-4 !font-sans text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-tight tracking-[-.045em] !text-[#102b33]">What sets our company apart</h2>
              <p className={`mt-4 ${bodyText}`}>Explore our portfolio, manufacturing, customisation, quality approach, service, research and partnerships.</p>
            </div>
          </Reveal>
          <div className="mt-9 grid gap-x-12 md:grid-cols-2">
            {strengths.map(({ number, icon: Icon, title, description }, index) => (
              <Reveal key={number} delay={(index % 2) * 0.05}>
                <article className="group flex h-full gap-4 border-t border-[#dbe6e3] py-6 sm:gap-5 sm:py-7">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E7F5F7] text-[#07546B] transition duration-300 group-hover:bg-[#07546B] group-hover:text-white"><Icon size={21} strokeWidth={1.8} /></div>
                  <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2"><span className="text-[11px] font-bold tracking-wider text-[#839ca1]">{number}</span><h3 className="!m-0 !font-sans text-[17px] font-extrabold leading-snug !text-[#142e35] sm:text-[19px]">{title}</h3></div>
                    <p className="!m-0 text-[14px] leading-[1.85] text-[#5b6f76]">{description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FULL PRODUCT RANGE, all user-provided groups */}
      <section className="bg-[#f5f9f8] py-14 sm:py-[76px]" aria-labelledby="about-range-title">
        <div className="container mx-auto max-w-[1300px]">
          <Reveal>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className={sectionLabel}>OUR PRODUCT PORTFOLIO</p>
                <h2 id="about-range-title" className="mt-4 max-w-[820px] !font-sans text-[clamp(2rem,4vw,3.35rem)] font-extrabold leading-tight tracking-[-.045em] !text-[#102b33]">A wide range of equipment for healthcare and laboratories.</h2>
                <p className={`mt-4 max-w-[860px] ${bodyText}`}>From hospital furniture and ICU equipment to diagnostic instruments, medical disposables, surgical supplies and rehabilitation products.</p>
              </div>
              <Link to="/categories" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#07546B] px-5 py-3 text-sm font-bold !text-[#07546B] transition hover:bg-[#e1f1ec]">Explore Categories <ArrowUpRight size={17}/></Link>
            </div>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {productGroups.map(group => <span key={group} className="rounded-lg border border-[#DCECF0] bg-white px-3.5 py-2.5 text-[13px] font-semibold text-[#284a4d]">{group}</span>)}
          </div>
        </div>
      </section>

      {/* DISTRIBUTION AND VISION */}
      <section className="bg-white py-14 sm:py-[76px]">
        <div className="container mx-auto grid max-w-[1300px] items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-[24px] bg-[#ebf4f1]">
              <img src="/images/why-conxport/sourcing.png" loading="lazy" alt="Medical equipment sourcing and supply" className="h-[260px] w-full object-cover sm:h-[380px]" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className={sectionLabel}>CONXPORT NETWORK</p>
              <h2 className="mt-4 !font-sans text-[clamp(2rem,3.6vw,3.3rem)] font-extrabold leading-tight tracking-[-.045em] !text-[#102b33]">Supporting healthcare across borders.</h2>
              <p className={`mt-5 ${bodyText}`}>ConXport is currently exporting medical equipment and hospital furniture around the world with a long list of satisfied clients. We export medical equipment and hospital furniture on an OEM brands basis. ConXport has a worldwide network for distribution of medical scientific and hospital furniture.</p>
              <Link to="/distributor-network" className="mt-5 inline-flex items-center gap-2 text-sm font-bold !text-[#07546B] hover:underline">View Distributor Network <ArrowUpRight size={17}/></Link>
              <div className="mt-8 border-t border-[#dbe6e3] pt-7">
                <p className={sectionLabel}>OUR VISION</p>
                <h3 className="mt-3 !font-sans text-[23px] font-extrabold !text-[#102b33]">Empowering laboratories and healthcare facilities</h3>
                <p className={`mt-3 ${bodyText}`}>At Contemporary Export Industries our mission is to empower laboratories and healthcare facilities with reliable, technologically advanced equipment that enables accurate diagnoses, research advancements, and improved patient outcomes. We are dedicated to being a trusted partner, delivering high-quality products, personalized service, and innovative solutions that contribute to the advancement of science and healthcare.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VERIFIED REFERENCE CONTACT DETAILS */}
      <section className="bg-[#f5f9f8] py-12 sm:py-16">
        <div className="container mx-auto max-w-[1300px]">
          <Reveal>
            <p className={sectionLabel}>GET IN TOUCH</p>
            <h2 className="mt-3 !font-sans text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold tracking-[-.045em] !text-[#102b33]">Contemporary Export Industries</h2>
            <div className="mt-7 grid gap-5 border-t border-[#d7e6e1] pt-7 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3"><MapPin size={20} className="mt-1 shrink-0 text-[#07546B]" /><div><p className="!m-0 text-xs font-bold uppercase tracking-wider text-[#07546B]">Address</p><p className="mt-2 text-sm leading-7 text-[#4e666e]">6342, Nicholson Road, Ambala Cantt, Haryana 133001, India</p></div></div>
              <div className="flex items-start gap-3"><Phone size={20} className="mt-1 shrink-0 text-[#07546B]" /><div><p className="!m-0 text-xs font-bold uppercase tracking-wider text-[#07546B]">Phone</p><a href="tel:+919896711929" className="mt-2 block text-sm !text-[#304b52] hover:underline">+91 98967 11929</a><a href="tel:+919729999965" className="mt-1 block text-sm !text-[#304b52] hover:underline">+91 97299 99965</a></div></div>
              <div className="flex items-start gap-3"><Mail size={20} className="mt-1 shrink-0 text-[#07546B]" /><div><p className="!m-0 text-xs font-bold uppercase tracking-wider text-[#07546B]">Email</p><a href="mailto:trehan.akhil@yahoo.com" className="mt-2 block break-all text-sm !text-[#304b52] hover:underline">trehan.akhil@yahoo.com</a><p className="mt-2 text-xs leading-5 text-[#74888b]">Contact details sourced from the supplied distributor document.</p></div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEWSLETTER: same existing email-intent functionality, no backend claim */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto max-w-[1300px]">
          <Reveal>
            <div className="flex flex-col justify-between gap-7 rounded-[22px] bg-[linear-gradient(112deg,#09252c,#0e5248)] px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:px-12 lg:py-10">
              <div className="max-w-[590px]"><p className="!m-0 text-[11px] font-bold uppercase tracking-[.18em] !text-[#8ed8c7]">STAY CONNECTED</p><h2 className="mt-3 !font-sans text-[clamp(1.6rem,2.6vw,2.45rem)] font-extrabold leading-tight !text-white">Get our best deals straight to your inbox!</h2><p className="mt-2 text-sm leading-6 !text-[#c9dfdb]">Send us a request to receive company updates and equipment information.</p></div>
              <form onSubmit={subscribe} aria-label="Newsletter enquiry" className="flex w-full max-w-[480px] gap-2 rounded-xl bg-white p-2"><label className="sr-only" htmlFor="conx-about-newsletter">Email address</label><input id="conx-about-newsletter" type="email" required placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} className="min-w-0 flex-1 rounded-lg border-0 bg-white px-3 py-2 text-sm text-[#102b33] outline-none" /><button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-lg !bg-[#07546B] px-4 py-2.5 text-sm font-bold !text-white hover:!bg-[#0a493f]">Subscribe <ArrowUpRight size={15}/></button></form>
            </div>
            <p className="mt-2 !text-xs !text-[#71858a]">Subscription opens an email request; no automated mailing list is connected.</p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="pb-14 sm:pb-20">
        <div className="container mx-auto max-w-[1300px]">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 border-t border-[#d9e7e2] pt-8 sm:flex-row sm:items-center">
              <div><p className={sectionLabel}>NEED ASSISTANCE?</p><h2 className="mt-2 !font-sans text-[clamp(1.7rem,3vw,2.7rem)] font-extrabold tracking-[-.045em] !text-[#102b33]">Have a medical equipment requirement?</h2><p className={`mt-2 ${bodyText}`}>Share your requirements and our team can discuss the next steps.</p></div>
              <Link to="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#07546B] px-6 py-3.5 text-sm font-bold !text-white transition hover:bg-[#053F52]">Contact ConXport <ArrowUpRight size={17}/></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
