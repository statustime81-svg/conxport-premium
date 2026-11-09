
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Download,
} from 'lucide-react';

import {
  MegaMenu,
  MobileNavigation,
} from './NavigationComponents';

import SearchBar from './SearchBar';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Close menus when page changes
  useEffect(() => {
    setMobileOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  // Sticky header shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Keyboard escape and outside click support
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setCategoriesOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setCategoriesOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  const navBase = `
    relative inline-flex h-[54px]
    shrink-0 items-center justify-center
    whitespace-nowrap !px-0
    text-[15px] xl:text-[16px]
    font-bold font-['Manrope',system-ui,sans-serif] tracking-[-0.015em]
    transition-colors duration-300
    after:absolute after:bottom-[3px]
    after:left-1/2 after:h-[2px]
    after:w-0 after:-translate-x-1/2
    after:rounded-full after:bg-[#D84312]
    after:transition-all after:duration-300
    hover:after:w-full
  `;

  const navLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `${navBase} ${
      isActive
        ? '!text-[#D84312] after:w-full'
        : '!text-[#043C50] hover:!text-[#D84312]'
    }`;

  return (
    <header
      className={`
        cx-header
        !sticky !top-0 !z-[1000]
        !w-full !border-0 !bg-white
        !backdrop-blur-none
        transition-shadow duration-300
        ${
          scrolled
            ? 'shadow-[0_8px_25px_rgba(8,35,45,0.09)]'
            : 'shadow-none'
        }
      `}
    >
      {/* ======================================= */}
      {/* FIRST ROW: LOGO, SEARCH, DOWNLOAD, QUOTE */}
      {/* ======================================= */}

      <div className="w-full !border-0 bg-white">
        <div
          className="
            mx-auto flex h-[78px] w-full
            max-w-[1600px]
            items-center justify-between
            gap-4 px-4
            sm:px-6 lg:px-8 xl:px-12
          "
        >
          {/* LOGO */}
          <Link
            to="/"
            aria-label="ConXport Homepage"
            className="
              group flex h-full
              shrink-0 items-center
              justify-start py-2
            "
            onClick={() => {
              setMobileOpen(false);
              setCategoriesOpen(false);
            }}
          >
            <img
              src="/images/logo.png"
              alt="ConXport"
              className="
                h-[43px] w-auto
                max-w-[140px]
                object-contain
                transition-transform duration-300
                group-hover:scale-[1.035]
                sm:h-[55px] sm:max-w-[220px]
                lg:h-[64px] lg:max-w-[255px]
                xl:h-[68px] xl:max-w-[270px]
              "
            />
          </Link>

          {/* DESKTOP ACTIONS */}
          <div
            className="
              flex min-w-0 flex-1
              items-center justify-end
              gap-2 sm:gap-3 lg:gap-4
            "
          >
            {/* SEARCH BAR: DIRECTLY AFTER LOGO */}
           <div
  className="
    hidden min-w-0
    flex-1
    lg:block
    lg:max-w-[350px]
    xl:max-w-[500px]
    2xl:max-w-[600px]
  "
>
  <SearchBar placeholder="Search hospital equipment..." />
</div>

            {/* DOWNLOAD PROFILE: AFTER SEARCH */}
            <a
              href="/downloads/conxport-company-profile.pdf"
              download="ConXport-Company-Profile.pdf"
              className="
                group inline-flex h-[42px]
                shrink-0 items-center
                justify-center gap-2
                whitespace-nowrap
                rounded-full
                border border-[#dfeae8]
                bg-[#F1F7FA]
                px-3 sm:px-5
                !text-[#043C50]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-[#D84312]/40
                hover:bg-[#FFF1EB]
              "
            >
              <Download
                size={17}
                className="
                  transition-transform duration-300
                  group-hover:translate-y-[2px]
                "
              />

              <span
                className="
                  hidden text-[12px]
                  font-bold sm:inline
                  xl:text-[13px]
                "
              >
                Download Profile
              </span>
            </a>

            {/* REQUEST QUOTE: LAST */}
            <Link
              to="/quote-list"
              className="
                group inline-flex h-[42px]
                shrink-0 items-center
                justify-center gap-2
                whitespace-nowrap
                rounded-full
                !bg-[#D84312]
                px-3 sm:px-5 lg:px-6
                text-[11px] sm:text-[12px]
                xl:text-[13px]
                font-extrabold !text-white
                shadow-[0_6px_18px_rgba(13,92,79,0.15)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:!bg-[#043C50]
                hover:shadow-[0_12px_25px_rgba(13,92,79,0.22)]
              "
            >
              Request Quote

              <ArrowUpRight
                size={17}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label={
                mobileOpen
                  ? 'Close navigation'
                  : 'Open navigation'
              }
              aria-expanded={mobileOpen}
              aria-controls="cx-mobile-menu"
              onClick={() => {
                setMobileOpen((open) => !open);
                setCategoriesOpen(false);
              }}
              className="
                grid h-[42px] w-[42px]
                shrink-0 place-items-center
                rounded-xl
                border border-[#dfeae8]
                bg-white !text-[#043C50]
                transition-colors duration-300
                hover:bg-[#FFF1EB]
                lg:hidden
              "
            >
              {mobileOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ======================================= */}
      {/* SEARCH BAR FOR MOBILE / TABLET          */}
      {/* ======================================= */}

      <div
        className="
          w-full bg-white
          px-4 pb-3
          sm:px-6
          lg:hidden
        "
      >
        <div className="mx-auto w-full max-w-[900px]">
          <SearchBar
            placeholder="Search hospital equipment..."
          />
        </div>
      </div>

      {/* ======================================= */}
      {/* SECOND ROW: NAVIGATION                  */}
      {/* ======================================= */}

      <div className="hidden w-full !border-0 bg-white lg:block">
        <nav
          aria-label="Main navigation"
          className="
            mx-auto flex h-[54px] w-full
            max-w-[1210px]
            items-center justify-between
            gap-2 px-6 xl:px-8
          "
        >
          {/* HOME */}
          <NavLink
            to="/"
            end
            className={navLinkClass}
          >
            Home
          </NavLink>

          {/* ABOUT */}
          <NavLink
            to="/about"
            className={navLinkClass}
          >
            About
          </NavLink>

          {/* CATEGORIES MEGA MENU */}
          <div
            ref={categoriesRef}
            className="
              cx-mega-trigger
              relative !m-0 flex h-[54px]
              items-center !p-0 !py-0
            "
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setCategoriesOpen(false);
              }
            }}
          >
            <button
              type="button"
              aria-expanded={categoriesOpen}
              aria-controls="cx-mega-menu"
              aria-haspopup="true"
              onClick={() => {
                setCategoriesOpen((open) => !open);
              }}
              className={`
                ${navBase}
                !border-0 !bg-transparent
                !p-0 !py-0
                ${
                  categoriesOpen
                    ? '!text-[#D84312] after:w-full'
                    : '!text-[#043C50] hover:!text-[#D84312]'
                }
              `}
            >
              Categories

              <ChevronDown
                size={16}
                className={`
                  ml-2
                  transition-transform duration-300
                  ${categoriesOpen ? 'rotate-180' : ''}
                `}
              />
            </button>

            {/* EXISTING MEGA MENU */}
            {categoriesOpen && (
              <MegaMenu
                onNavigate={() => {
                  setCategoriesOpen(false);
                }}
              />
            )}
          </div>

          {/* INSIGHTS */}
          <NavLink
            to="/blog"
            className={navLinkClass}
          >
            Insights
          </NavLink>

          {/* OUR EXPO */}
          <NavLink
            to="/our-expo"
            className={navLinkClass}
          >
            Our Expo
          </NavLink>

          {/* CERTIFICATES */}
          <NavLink
            to="/certifications"
            className={navLinkClass}
          >
            Certificates
          </NavLink>

          {/* DISTRIBUTOR NETWORK */}
          <NavLink
            to="/distributor"
            className={navLinkClass}
          >
            Distributor
          </NavLink>

          {/* CASE STUDIES */}
          <NavLink
            to="/turnkey-projects"
            className={navLinkClass}
          >
            Turnkey Projects
          </NavLink>

          {/* CONTACT */}
          <NavLink
            to="/contact"
            className={navLinkClass}
          >
            Contact
          </NavLink>
        </nav>
      </div>

      {/* ======================================= */}
      {/* MOBILE NAVIGATION                       */}
      {/* ======================================= */}

      {mobileOpen && (
        <MobileNavigation
          onNavigate={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}