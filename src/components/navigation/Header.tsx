import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import CircularNavigation from './CircularNavigation';

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`cx-header !sticky !top-0 !z-[1000] !w-full !border-0 !bg-white transition-shadow duration-300 ${scrolled ? 'shadow-[0_12px_35px_rgba(4,60,80,0.12)]' : 'shadow-none'}`}>
        <div className="w-full border-b border-[#dce9ee] bg-white">
          <div className="mx-auto flex min-h-[78px] w-full max-w-[1600px] items-center gap-3 px-4 py-2 sm:px-6 lg:px-8 xl:px-12">
            <Link to="/" aria-label="ConXport home" className="group inline-flex shrink-0 items-center" onClick={() => setMenuOpen(false)}>
              <img src="/images/logo.png" alt="ConXport" className="h-[44px] w-auto max-w-[130px] object-contain transition-transform duration-300 group-hover:scale-[1.035] sm:h-[54px] sm:max-w-[205px] lg:h-[62px] lg:max-w-[250px]" />
            </Link>

            <div className="hidden min-w-0 flex-1 lg:block lg:pl-4">
              <div className="mx-auto max-w-[570px]"><SearchBar placeholder="Search hospital equipment..." /></div>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
              <a href="/downloads/conxport-company-profile.pdf" download="ConXport-Company-Profile.pdf" className="group hidden h-11 items-center gap-2 rounded-full border border-[#dce9ee] bg-[#F1F7FA] px-4 text-xs font-bold !text-[#043C50] transition duration-300 hover:-translate-y-0.5 hover:border-[#F93E02]/40 hover:bg-white xl:inline-flex">
                <Download size={16} className="transition group-hover:translate-y-0.5" /> Download Profile
              </a>
              <Link to="/quote-list" className="group inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full !bg-[#F93E02] px-3 text-[11px] font-extrabold !text-white shadow-[0_8px_20px_rgba(249,62,2,0.18)] transition duration-300 hover:-translate-y-0.5 hover:!bg-[#D93600] sm:px-5 sm:text-xs">
                Request Quote <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(value => !value)}
                aria-label={menuOpen ? 'Close circular navigation' : 'Open circular navigation'}
                aria-expanded={menuOpen}
                aria-controls="cx-circular-navigation"
                className="group inline-flex h-11 items-center gap-2 rounded-full !bg-[#043C50] px-3 !text-white transition duration-300 hover:!bg-[#07546B] sm:px-5"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="hidden text-xs font-extrabold tracking-[0.1em] sm:inline">{menuOpen ? 'CLOSE' : 'MENU'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 pb-3 sm:px-6 lg:hidden">
          <div className="mx-auto w-full max-w-[900px]"><SearchBar placeholder="Search hospital equipment..." /></div>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-[#043C50] via-[#F93E02] to-[#043C50]" />
      </header>
      <CircularNavigation isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
