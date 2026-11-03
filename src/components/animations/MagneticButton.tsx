import { useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';

type Props = HTMLMotionProps<"button"> & {
  children: ReactNode;
  strength?: number;
};

/** A real button with an optional desktop magnetic offset. */
export default function MagneticButton({ children, strength = 0.17, onMouseMove, onMouseLeave, style, type = 'button', ...props }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reset = (event: MouseEvent<HTMLButtonElement>) => {
    setOffset({ x: 0, y: 0 });
    onMouseLeave?.(event);
  };
  return (
    <motion.button
      {...props}
      ref={ref}
      type={type}
      style={style}
      animate={reduceMotion || props.disabled ? { x: 0, y: 0 } : offset}
      transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.35 }}
      onMouseMove={(event) => {
        onMouseMove?.(event);
        if (reduceMotion || props.disabled || !ref.current || !window.matchMedia('(pointer: fine)').matches) return;
        const r = ref.current.getBoundingClientRect();
        setOffset({ x: (event.clientX - r.left - r.width / 2) * strength, y: (event.clientY - r.top - r.height / 2) * strength });
      }}
      onMouseLeave={reset}
    >
      {children}
    </motion.button>
  );
}
