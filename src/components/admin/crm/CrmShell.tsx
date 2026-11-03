import type { ReactNode } from 'react';
export default function CrmShell({title,description,children}:{title:string;description:string;children:ReactNode}){return <section className="cx-portal"><p className="cx-overline">CONXPORT / CUSTOMER RELATIONSHIPS</p><h1>{title}</h1><p>{description}</p><div style={{display:'grid',gap:18,marginTop:24}}>{children}</div></section>;}
