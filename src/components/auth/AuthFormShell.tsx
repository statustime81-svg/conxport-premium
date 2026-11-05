import type { ReactNode } from 'react';
import { Link } from 'react-router';

type Props = { eyebrow: string; title: string; description: string; children: ReactNode };

export default function AuthFormShell({ eyebrow, title, description, children }: Props) {
  return (
    <section style={{ minHeight: '75vh', display: 'grid', placeItems: 'center', padding: '6rem 1.25rem' }}>
      <div style={{ width: '100%', maxWidth: 485, padding: 'clamp(1.5rem,4vw,3rem)', border: '1px solid #36515a', borderRadius: 24, background: '#14242b', color: '#fff' }}>
        <Link to="/" style={{ color: '#FF6A35', textDecoration: 'none', fontWeight: 800 }}>C. CONXPORT</Link>
        <p style={{ color: '#FF6A35', letterSpacing: '.16em', fontSize: 12, marginTop: 28 }}>{eyebrow}</p>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', lineHeight: 1.1, margin: '12px 0' }}>{title}</h1>
        <p style={{ color: '#afc5ca', lineHeight: 1.7, marginBottom: 25 }}>{description}</p>
        {children}
      </div>
    </section>
  );
}

export const fieldStyle = { width: '100%', boxSizing: 'border-box' as const, background: '#0c1b22', color: '#fff', border: '1px solid #41606a', borderRadius: 8, padding: '13px 14px', marginTop: 6, marginBottom: 18 };
export const buttonStyle = { width: '100%', background: '#FF6A35', color: '#0c1b22', border: 0, borderRadius: 8, padding: '14px', fontWeight: 800, cursor: 'pointer' };
