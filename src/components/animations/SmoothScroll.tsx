import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

type Props = { children: ReactNode };

/** Page-level Lenis. Uses native scrolling on touch and reduced-motion devices. */
export default function SmoothScroll({ children }: Props) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    if (reducedMotion.matches || coarsePointer.matches) return;
    const lenis = new Lenis({ duration: 1.08, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
