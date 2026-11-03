import type{ReactNode}from'react';
export default function CmsShell({title,description,children}:{title:string;description:string;children:ReactNode}){return <section className="container" style={{paddingBlock:'2rem 5rem',display:'grid',gap:20}}><header><p className="cx-overline">CONXPORT CONTENT MANAGEMENT</p><h1>{title}</h1><p>{description}</p></header>{children}</section>;}
