import { useRef, useState } from 'react';
import type { CSSProperties, HTMLAttributes, PointerEvent, ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';

type TiltCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ReactNode;
  intensity?: number;
  glare?: boolean;
};

/** Accessible pointer tilt. Never blocks links and buttons nested inside the card. */
export default function TiltCard({ children, intensity = 9, glare = true, style, onPointerMove, onPointerLeave, ...props }: TiltCardProps) {
  const surface = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 50, y: 50, rx: 0, ry: 0 });

  function move(event: PointerEvent<HTMLDivElement>) {
    onPointerMove?.(event);
    if (reducedMotion || event.pointerType === 'touch' || !surface.current) return;
    const rect = surface.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y, rx: (50 - y) / 50 * intensity, ry: (x - 50) / 50 * intensity });
  }

  function leave(event: PointerEvent<HTMLDivElement>) {
    onPointerLeave?.(event);
    setPosition({ x: 50, y: 50, rx: 0, ry: 0 });
  }

  const transform = reducedMotion ? undefined : `perspective(1100px) rotateX(${position.rx}deg) rotateY(${position.ry}deg)`;
  const mergedStyle: CSSProperties = { position: 'relative', transform, transition: 'transform 220ms ease-out', transformStyle: 'preserve-3d', ...style };

  return (
    <div {...props} ref={surface} onPointerMove={move} onPointerLeave={leave} style={mergedStyle}>
      {children}
      {glare && !reducedMotion && (
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit', background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(71,216,194,.12), transparent 62%)` }} />
      )}
    </div>
  );
}
