import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
};

/** Progressive enhancement: works without 3D models or scroll libraries. */
export default function Reveal({
  children, className, delay = 0, duration = 0.65, distance = 32, once = true,
}: Props) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
