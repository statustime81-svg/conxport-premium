import { Suspense } from 'react';import type { ReactNode } from 'react';
export default function LazyBoundary({children,label='Loading'}:{children:ReactNode;label?:string}){return <Suspense fallback={<div role="status" aria-live="polite" className="container py-12 text-slate-300">{label}…</div>}>{children}</Suspense>}
