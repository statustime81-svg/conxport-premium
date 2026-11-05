
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import Reveal from '../animations/Reveal';

export default function HomeAboutSection() {
  return (
    <section
      id="home-about"
      aria-labelledby="home-about-title"
      className="
        relative isolate overflow-hidden
        bg-white py-[clamp(80px,9vw,140px)]
        text-[#102D3C]
      "
    >
      <div className="container relative z-10 !max-w-[1440px]">

        {/* PREMIUM TWO COLUMN LAYOUT */}
        <div
          className="
            grid grid-cols-1
            items-start gap-12
            lg:grid-cols-2
            lg:gap-16 xl:gap-24
          "
        >

          {/* LEFT SIDE: REAL PHOTO */}
          <Reveal>
            <div
              className="
                group relative
                mx-auto w-full
                max-w-[690px]
                lg:mx-0
              "
            >
              {/* Layered 3D depth */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -bottom-5 -right-5
                  h-full w-full
                  rounded-[30px]
                  bg-[#E7F5F7]
                  transition-transform duration-700
                  motion-safe:group-hover:translate-x-2
                  motion-safe:group-hover:translate-y-2
                "
              />

              {/* Image container */}
              <div
                className="
                  relative overflow-hidden
                  rounded-[30px]
                  border border-[#d9e5ec]
                  bg-[#F1F7FA]
                  shadow-[0_35px_85px_-35px_rgba(7,84,107,0.25)]
                  transition-shadow duration-500
                  group-hover:shadow-[0_45px_90px_-30px_rgba(7,84,107,0.3)]
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1766297246958-b6ca17b56fb7?auto=format&fit=crop&w=1400&q=85"
                  alt="Medical laboratory professional working with diagnostic equipment"
                  loading="lazy"
                  className="
                    aspect-[4/4.1]
                    w-full object-cover
                    object-center
                    transition-transform duration-700
                    motion-safe:group-hover:scale-[1.045]
                  "
                />
              </div>
            </div>
          </Reveal>

          {/* RIGHT SIDE: ABOUT CONTENT */}
          <Reveal delay={0.1}>
            <div
              className="
                flex h-full flex-col
                items-start justify-center
                lg:min-h-[550px]
              "
            >

              {/* Eyebrow */}
              <div
                className="
                  mb-7 inline-flex
                  items-center gap-3
                  font-['Manrope',system-ui,sans-serif]
                  text-[11px]
                  font-extrabold uppercase
                  tracking-[0.22em]
                  text-[#07546B]
                "
              >
                <span
                  className="
                    h-[2px] w-9
                    rounded-full bg-[#FF4F18]
                  "
                />
                About ConXport
              </div>

              {/* Heading */}
              <h2
                id="home-about-title"
                className="
                  !m-0 max-w-[720px]
                  font-['DM_Serif_Display',Georgia,serif]
                  text-[clamp(3rem,5vw,5.8rem)]
                  font-normal
                  leading-[1.06]
                  tracking-[-0.055em]
                  !text-[#102D3C]
                "
              >
                The leading manufacturer &amp; exporter of
                medical &amp; hospital equipment.
              </h2>

              {/* Original About Information */}
              <p
                className="
                  mb-0 mt-8
                  max-w-[670px]
                  font-['Manrope',system-ui,sans-serif]
                  text-[clamp(14px,1.15vw,17px)]
                  leading-[1.9]
                  !text-[#596670]
                "
              >
                Recognized in the year 2010 at Ambala,
                Haryana (India), we, Contemporary Export
                Industries, are one of the well-known
                manufacturers and exporters of medical and
                hospital equipment under the ConXport brand.
                We know that complete client satisfaction
                is the key to success in the competitive
                business arena. Our professionals work in
                close coordination with our customers to
                fulfil all their requirements within the
                set time frame.
              </p>

              {/* CTA */}
              <div className="mt-10">
                <Link
                  to="/about"
                  className="
                    group inline-flex
                    items-center gap-3
                    rounded-full
                    bg-[#07546B]
                    px-8 py-4
                    font-['Manrope',system-ui,sans-serif]
                    text-sm font-bold
                    !text-white
                    shadow-[0_14px_30px_-16px_rgba(7,84,107,0.5)]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:!bg-[#FF4F18]
                  "
                >
                  Discover our story

                  <ArrowUpRight
                    size={18}
                    className="
                      transition-transform duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
