
import { Link } from "react-router";

import {
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  Clock3,
  Cookie,
  Download,
  Facebook,
  FileText,
  Images,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Newspaper,
  Package,
  Phone,
  Youtube,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

// ========================================
// NEXOVA X
// ========================================

const NEXOVA_LOGO = "/images/nexova-logo.png";
const NEXOVA_URL = "https://www.nexovax.in/";

// ========================================
// FOOTER LINKS
// ========================================

type FooterLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const footerGroups: {
  title: string;
  links: FooterLink[];
}[] = [
  {
    title: "Catalogue",
    links: [
      {
        label: "Products",
        href: "/products",
        icon: Package,
      },
      {
        label: "Categories",
        href: "/categories",
        icon: Layers3,
      },
      {
        label: "Resources",
        href: "/resources",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About Us",
        href: "/about",
        icon: Building2,
      },
      {
        label: "Insights",
        href: "/blog",
        icon: Newspaper,
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        icon: BriefcaseBusiness,
      },
      {
        label: "Contact",
        href: "/contact",
        icon: Mail,
      },
      {
        label: "Our Expo",
        href: "/our-expo",
        icon: Images,
      },
      {
        label: "Certificates",
        href: "/certifications",
        icon: Award,
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        label: "FAQs",
        href: "/faq",
        icon: CircleHelp,
      },
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
        icon: FileText,
      },
      {
        label: "Terms & Conditions",
        href: "/terms-and-conditions",
        icon: FileText,
      },
      {
        label: "Cookies",
        href: "/cookie-policy",
        icon: Cookie,
      },
    ],
  },
];

// ========================================
// SOCIAL MEDIA
// ========================================

const socialLinks = [
  {
    label: "Facebook",
    href:
      "https://www.facebook.com/people/Contemporary-Export-Industries/100063897131859/",
    icon: Facebook,
    className:
      "bg-[#1877F2] hover:bg-[#1467d3]",
  },
  {
    label: "Instagram",
    href:
      "https://www.instagram.com/conxport_hospitalsetup",
    icon: Instagram,
    className:
      "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45]",
  },
  {
    label: "YouTube",
    href:
      "https://www.youtube.com/@contemporaryexportindustri2582",
    icon: Youtube,
    className:
      "bg-[#FF0033] hover:bg-[#da002b]",
  },
  {
    label: "LinkedIn",
    href:
      "https://www.linkedin.com/in/akhil-trehan-38137321a/",
    icon: Linkedin,
    className:
      "bg-[#0A66C2] hover:bg-[#08539e]",
  },
];

const footerLinkClass =
  "group inline-flex w-fit items-center gap-2.5 " +
  "rounded-sm text-[13px] leading-6 " +
  "!text-[#b8c9d1] transition-colors duration-200 " +
  "hover:!text-white " +
  "focus-visible:outline-2 " +
  "focus-visible:outline-offset-4 " +
  "focus-visible:outline-[#71dcc7]";

// ========================================
// NEXOVA CIRCULAR LOGO
// ========================================

function NexovaFooterCredit() {
  return (
    <a
      href={NEXOVA_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Visit NEXOVA X Official Website"
      aria-label="Visit NEXOVA X official website"
      className="
        group mt-6 inline-flex
        w-fit items-center gap-3
        rounded-xl
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#FF8A59]
      "
    >
      {/* Logo Circle */}
      <span
        className="
          relative flex h-[66px] w-[66px]
          shrink-0 items-center justify-center
          rounded-full
          border border-[#FF8A59]/40
          bg-white p-[5px]
          shadow-[0_5px_24px_rgba(0,0,0,0.25)]
          transition-all duration-300
          ease-out
          group-hover:-translate-y-1
          group-hover:scale-110
          group-hover:rotate-[3deg]
          group-hover:border-[#FF8A59]
          group-hover:shadow-[0_0_28px_rgba(255,138,89,0.40)]
          motion-reduce:transform-none
        "
      >
        <span
          className="
            flex h-full w-full items-center
            justify-center overflow-hidden
            rounded-full bg-white
          "
        >
          <img
            src={NEXOVA_LOGO}
            alt="NEXOVA X Logo"
            loading="lazy"
            decoding="async"
            className="
              h-full w-full object-contain
              transition-transform duration-300
              group-hover:scale-105
            "
          />
        </span>
      </span>

      {/* Developer Label */}
      <span className="min-w-0">
        <span
          className="
            block text-[10px]
            font-semibold uppercase
            tracking-[0.13em]
            text-[#90aeb8]
          "
        >
          Developed by
        </span>

        <span
          className="
            mt-1 flex items-center gap-1.5
            text-[13px] font-bold
            tracking-[0.04em]
            text-white
            transition-colors duration-300
            group-hover:text-[#FF9C7D]
          "
        >
          NEXOVA X

          <ArrowUpRight
            size={15}
            className="
              text-[#FF8A59]
              transition-transform duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />
        </span>

        <span
          className="
            mt-0.5 block text-[11px]
            text-[#90aeb8]
          "
        >
          Built Beyond Limits
        </span>
      </span>
    </a>
  );
}

// ========================================
// MAIN FOOTER
// ========================================

export default function Footer() {
  return (
    <footer
      className="
        relative isolate w-full
        overflow-hidden
        !bg-[#08151c] !text-white
      "
    >
      {/* Background Gradients */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(120deg,#07141d_0%,#102530_48%,#0a2024_100%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-44 -top-64
          h-[490px] w-[490px]
          rounded-full
          bg-[#D84312]/[0.10]
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-56 -left-32
          h-[420px] w-[420px]
          rounded-full
          bg-[#194e73]/[0.15]
          blur-[100px]
        "
      />

      {/* Footer Container */}
      <div
        className="
          relative mx-auto max-w-[1440px]
          px-5 pb-6 pt-12
          sm:px-8
          lg:px-12 lg:pt-16
        "
      >
        <div
          className="
            grid gap-10
            lg:grid-cols-[minmax(0,1.28fr)_minmax(0,2fr)]
            lg:gap-14 xl:gap-20
          "
        >
          {/* ====================================
              LEFT: BRAND AND CONTACT
          ==================================== */}

          <div className="min-w-0">
            {/* ConXport Logo */}
            <Link
              to="/"
              aria-label="ConXport homepage"
              className="
                inline-flex items-center
                rounded-xl bg-white
                px-3.5 py-2
                shadow-[0_8px_30px_rgba(0,0,0,.12)]
                transition-transform duration-300
                hover:-translate-y-0.5
              "
            >
              <img
                src="/images/logo.png"
                alt="ConXport"
                loading="lazy"
                className="
                  h-[47px] w-auto
                  max-w-[205px] object-contain
                  sm:h-[52px]
                "
              />
            </Link>

            {/* Description */}
            <p
              className="
                !mb-0 !mt-5 max-w-[390px]
                !text-[13px] !leading-[1.9]
                !text-[#b3c4cb]
                sm:!text-[14px]
              "
            >
              Premium medical equipment sourcing for
              hospitals, laboratories and healthcare
              institutions.
            </p>

            {/* Contact Grid */}
            <div
              className="
                mt-7 grid grid-cols-1
                gap-x-4 gap-y-4
                sm:grid-cols-2
                lg:grid-cols-1
                xl:grid-cols-2
              "
            >
              {/* Phone */}
              <a
                href="tel:+919996510929"
                className="
                  group flex min-w-0
                  items-start gap-3
                  !text-[#d9e6e9]
                  transition-colors
                  hover:!text-white
                "
              >
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-[#FF8A59]"
                />

                <span className="min-w-0">
                  <span
                    className="
                      block text-[11px]
                      font-semibold uppercase
                      tracking-[.09em]
                      text-[#90aeb8]
                    "
                  >
                    Phone
                  </span>

                  <span className="mt-0.5 block text-[13px] font-medium">
                    +91 9996510929
                  </span>
                </span>
              </a>

              {/* Working Hours */}
              <div className="flex min-w-0 items-start gap-3">
                <Clock3
                  size={18}
                  className="mt-0.5 shrink-0 text-[#FF8A59]"
                />

                <span>
                  <span
                    className="
                      block text-[11px]
                      font-semibold uppercase
                      tracking-[.09em]
                      text-[#90aeb8]
                    "
                  >
                    Working hours
                  </span>

                  <span
                    className="
                      mt-0.5 block
                      text-[13px] leading-5
                      text-[#d9e6e9]
                    "
                  >
                    Mon–Fri · 10:00 to 8:00
                  </span>
                </span>
              </div>

              {/* Location */}
              <div className="flex min-w-0 items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#FF8A59]"
                />

                <span>
                  <span
                    className="
                      block text-[11px]
                      font-semibold uppercase
                      tracking-[.09em]
                      text-[#90aeb8]
                    "
                  >
                    Location
                  </span>

                  <span
                    className="
                      mt-0.5 block
                      text-[13px] leading-5
                      text-[#d9e6e9]
                    "
                  >
                    Ambala Cantt, 133001
                    <br />
                    Haryana, India
                  </span>
                </span>
              </div>

              {/* Contact Email */}
              <Link
                to="/contact"
                className="
                  group flex min-w-0
                  items-start gap-3
                  !text-[#d9e6e9]
                  transition-colors
                  hover:!text-white
                "
              >
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-[#FF8A59]"
                />

                <span>
                  <span
                    className="
                      block text-[11px]
                      font-semibold uppercase
                      tracking-[.09em]
                      text-[#90aeb8]
                    "
                  >
                    Email
                  </span>

                  <span
                    className="
                      mt-0.5 inline-flex
                      items-center gap-1
                      text-[13px] font-medium
                    "
                  >
                    Contact enquiry
                    <ArrowUpRight size={13} />
                  </span>
                </span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              {socialLinks.map(
                ({ label, href, icon: Icon, className }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    aria-label={`ConXport on ${label}`}
                    className={`
                      inline-flex h-10 w-10
                      items-center justify-center
                      rounded-full !text-white
                      shadow-[0_6px_14px_rgba(0,0,0,.18)]
                      transition-all duration-200
                      hover:-translate-y-1
                      hover:shadow-[0_10px_18px_rgba(0,0,0,.25)]
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-white
                      ${className}
                    `}
                  >
                    <Icon size={19} strokeWidth={2} />
                  </a>
                )
              )}

              {/* X / Twitter */}
              <a
                href="https://x.com/akhiltrehan3"
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
                aria-label="ConXport on X"
                className="
                  inline-flex h-10 w-10
                  items-center justify-center
                  rounded-full bg-black !text-white
                  shadow-[0_6px_14px_rgba(0,0,0,.18)]
                  transition-all duration-200
                  hover:-translate-y-1
                  hover:bg-[#222]
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-white
                "
              >
                <span
                  aria-hidden="true"
                  className="text-[18px] font-semibold"
                >
                  𝕏
                </span>
              </a>
            </div>
          </div>

          {/* ====================================
              RIGHT: NAVIGATION
          ==================================== */}

          <div
            className="
              grid grid-cols-2
              gap-x-5 gap-y-9
              sm:grid-cols-3 sm:gap-x-8
              lg:pt-2
            "
          >
            {footerGroups.map((group) => (
              <section
                key={group.title}
                aria-label={`${group.title} links`}
                className="min-w-0"
              >
                <h2
                  className="
                    !m-0 !text-[13px]
                    !font-extrabold !uppercase
                    !tracking-[.13em]
                    !text-white
                  "
                >
                  {group.title}
                </h2>

                {/* Orange heading underline */}
                <div className="mt-3 h-[2px] w-8 rounded-full bg-[#D84312]" />

                <ul className="!m-0 !mt-5 space-y-3 !p-0">
                  {group.links.map(
                    ({ label, href, icon: Icon }) => (
                      <li
                        key={href}
                        className="list-none"
                      >
                        <Link
                          to={href}
                          className={footerLinkClass}
                        >
                          <Icon
                            size={15}
                            strokeWidth={1.8}
                            className="
                              shrink-0 text-[#FF9C7D]
                              transition-colors
                              group-hover:text-white
                            "
                            aria-hidden="true"
                          />

                          <span>{label}</span>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </section>
            ))}

            {/* Profile download and developer credit, aligned side by side */}
            <div className="col-span-2 sm:col-span-3">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-5 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-5 sm:px-6">
                <a
                  href="/downloads/conxport-company-profile.pdf"
                  download="ConXport-Company-Profile.pdf"
                  className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2.5 rounded-full border border-[#D84312]/40 !bg-[#D84312] px-5 py-3 text-[13px] font-bold !text-white no-underline shadow-[0_8px_24px_rgba(216,67,18,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:!bg-[#B9320A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A59]"
                >
                  <Download size={17} aria-hidden="true" />
                  <span>Download Company Profile</span>
                  <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <div className="flex min-w-0 items-center [&>a]:!mt-0">
                  <NexovaFooterCredit />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================
            COPYRIGHT
        ==================================== */}

        <div
          className="
            mt-11 flex flex-col gap-2
            border-t border-white/[0.12]
            pt-5 text-[12px]
            text-[#90a9b3]
            sm:flex-row sm:items-center
            sm:justify-between
            lg:mt-14
          "
        >
          <span>
            © {new Date().getFullYear()} ConXport.
            All rights reserved.
          </span>

          <span>India & International Enquiries</span>
        </div>
      </div>
    </footer>
  );
}
