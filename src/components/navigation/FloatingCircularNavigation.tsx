import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Link, useLocation } from 'react-router';
import {
  Award, BookOpen, Building2, Grid2X2, Home, Mail, Menu,
  Network, ShieldCheck, Stethoscope, X, type LucideIcon,
} from 'lucide-react';
import './floating-circular-navigation.css';

type Position = { x: number; y: number };
type MenuItem = { label: string; to: string; icon: LucideIcon };

// Same real public routes as the existing desktop navbar. No sample/demo URLs.
const navigation: MenuItem[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'About', to: '/about', icon: Building2 },
  { label: 'Categories', to: '/categories', icon: Grid2X2 },
  { label: 'Insights', to: '/blog', icon: BookOpen },
  { label: 'Our Expo', to: '/our-expo', icon: Award },
  { label: 'Certificates', to: '/certifications', icon: ShieldCheck },
  { label: 'Distributor', to: '/distributor', icon: Network },
  { label: 'Turnkey', to: '/turnkey-projects', icon: Stethoscope },
  { label: 'Contact', to: '/contact', icon: Mail },
];

const BUTTON_RADIUS = 30;
function bounded(point: Position): Position {
  if (typeof window === 'undefined') return point;
  return {
    x: Math.min(Math.max(BUTTON_RADIUS + 6, point.x), Math.max(BUTTON_RADIUS + 6, window.innerWidth - BUTTON_RADIUS - 6)),
    y: Math.min(Math.max(BUTTON_RADIUS + 6, point.y), Math.max(BUTTON_RADIUS + 6, window.innerHeight - BUTTON_RADIUS - 6)),
  };
}

export default function FloatingCircularNavigation() {
  const { pathname } = useLocation();
  const [position, setPosition] = useState<Position>(() => typeof window === 'undefined'
    ? { x: 65, y: 260 }
    : { x: 62, y: Math.max(72, window.innerHeight - 160) });
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const pointer = useRef<{ id: number; originX: number; originY: number; initial: Position; moved: boolean } | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const onResize = () => setPosition(current => bounded(current));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    pointer.current = {
      id: event.pointerId, originX: event.clientX, originY: event.clientY,
      initial: position, moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = pointer.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.originX;
    const dy = event.clientY - current.originY;
    if (Math.hypot(dx, dy) > 6) current.moved = true;
    if (!current.moved) return;
    setDragging(true);
    setOpen(false);
    setPosition(bounded({ x: current.initial.x + dx, y: current.initial.y + dy }));
  };
  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = pointer.current;
    if (!current || current.id !== event.pointerId) return;
    pointer.current = null;
    setDragging(false);
    if (!current.moved) setOpen(value => !value);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };
  const onPointerCancel = () => {
    pointer.current = null;
    setDragging(false);
  };

  // The orbit stays inside the viewport even if the user drags the trigger to an edge.
  // It is independent of the navbar and therefore never changes header sizing.
  const radius = typeof window === 'undefined' ? 154 : Math.min(154, Math.max(118, Math.min(window.innerWidth, window.innerHeight) * 0.39));
  const orbitCenter = bounded({
    x: Math.min(Math.max(radius + 7, position.x), Math.max(radius + 7, (typeof window === 'undefined' ? 900 : window.innerWidth) - radius - 7)),
    y: Math.min(Math.max(radius + 7, position.y), Math.max(radius + 7, (typeof window === 'undefined' ? 900 : window.innerHeight) - radius - 7)),
  });
  const orbit = radius * 0.73;

  return (
    <>
      {open && (
        <div className="cx-floating-menu-layer" aria-label="Quick navigation">
          <button type="button" className="cx-floating-menu-dismiss" aria-label="Close quick navigation" onClick={() => setOpen(false)} />
          <nav
            id="cx-floating-orbit"
            className="cx-floating-orbit"
            aria-label="Quick page navigation"
            style={{ left: orbitCenter.x, top: orbitCenter.y, width: radius * 2, height: radius * 2 }}
          >
            <div className="cx-floating-orbit-ring" aria-hidden="true" />
            <div className="cx-floating-orbit-core" aria-hidden="true">
              <span>CON<span className="cx-floating-accent">X</span>PORT</span>
              <small>QUICK NAV</small>
            </div>
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const angle = -Math.PI / 2 + (2 * Math.PI * index) / navigation.length;
              const x = Math.cos(angle) * orbit;
              const y = Math.sin(angle) * orbit;
              const active = item.to === '/' ? pathname === '/' : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`cx-floating-orbit-item ${active ? 'is-current' : ''}`}
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, animationDelay: `${index * 25}ms` }}
                  onClick={() => setOpen(false)}
                  title={item.label}
                >
                  <Icon size={19} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
      <button
        ref={trigger}
        type="button"
        className={`cx-floating-trigger ${open ? 'is-open' : ''} ${dragging ? 'is-dragging' : ''}`}
        style={{ left: position.x, top: position.y }}
        aria-label={open ? 'Close floating navigation' : 'Open floating navigation, or drag to move'}
        aria-expanded={open}
        aria-controls="cx-floating-orbit"
        title="Drag to move • Tap to open"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
        <span className="cx-floating-trigger-dot" aria-hidden="true" />
      </button>
    </>
  );
}
