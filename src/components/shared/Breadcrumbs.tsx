import { Fragment } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

export type BreadcrumbItem = { label: string; href?: string };
type Props = { items: BreadcrumbItem[]; className?: string };

export default function Breadcrumbs({ items, className = '' }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={`cx-breadcrumbs ${className}`.trim()}>
      <ol>
        <li><Link to="/" aria-label="Home"><Home size={16} aria-hidden="true"/><span className="sr-only">Home</span></Link></li>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li aria-hidden="true" className="cx-breadcrumb-separator"><ChevronRight size={14}/></li>
              <li>
                {!last && item.href ? (
                  <Link to={item.href}>{item.label}</Link>
                ) : (
                  <span aria-current={last ? 'page' : undefined}>{item.label}</span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
      <style>{`
        .cx-breadcrumbs{color:#9cafb5;font-size:13px}
        .cx-breadcrumbs ol{display:flex;align-items:center;flex-wrap:wrap;gap:10px;list-style:none;margin:0;padding:0}
        .cx-breadcrumbs li{display:flex;align-items:center;min-height:20px}
        .cx-breadcrumbs a{color:inherit;transition:color .2s}
        .cx-breadcrumbs a:hover{color:#47d8c2}
        .cx-breadcrumbs [aria-current=page]{color:inherit;font-weight:700}
        .cx-breadcrumb-separator{opacity:.55}
      `}</style>
    </nav>
  );
}
