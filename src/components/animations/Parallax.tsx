import type { ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

type Props = { children: ReactNode; className?: string; distance?: number };

/** Scroll movement relative to the wrapper, disabled for reduced-motion users. */
export default function Parallax({ children, className, distance = 70 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className} style={{ position: 'relative' }}>
      <motion.div style={{ y: reducedMotion ? 0 : y }}>{children}</motion.div>
    </div>
  );
}
