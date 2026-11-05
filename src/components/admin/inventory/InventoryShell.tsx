import type { ReactNode } from 'react';
import { NavLink } from 'react-router';
import { Boxes, Warehouse, ArrowLeftRight, Bell, SlidersHorizontal } from 'lucide-react';

const items = [
  { label: 'Inventory', to: '/admin/inventory', icon: Boxes },
  { label: 'Warehouses', to: '/admin/warehouses', icon: Warehouse },
  { label: 'Stock movements', to: '/admin/stock-movements', icon: ArrowLeftRight },
  { label: 'Stock alerts', to: '/admin/stock-alerts', icon: Bell },
  { label: 'Adjust stock', to: '/admin/stock-adjustment', icon: SlidersHorizontal },
];

export default function InventoryShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="w-full min-w-0 pb-12 font-sans text-[#17313b]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="!mb-2 !text-[11px] !font-extrabold uppercase !tracking-[0.15em] !text-[#07546B]">CONXPORT / OPERATIONS</p>
          <h1 className="!m-0 !font-sans !text-[28px] !font-extrabold !tracking-[-0.035em] !text-[#102d37] sm:!text-[34px]">{title}</h1>
          <p className="!mb-0 !mt-2 max-w-[750px] !text-[14px] !leading-6 !text-[#627981]">{description}</p>
        </div>
      </div>
      <nav aria-label="Inventory modules" className="mb-6 flex flex-wrap gap-2 border-b border-[#dce7e5] pb-4">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `inline-flex min-h-10 items-center gap-2 rounded-xl border px-3.5 py-2 text-[12px] font-bold transition-colors duration-200 ${isActive ? '!border-[#07546B] !bg-[#07546B] !text-white' : '!border-[#dce8e5] !bg-white !text-[#31545a] hover:!border-[#7ab9aa] hover:!bg-[#f3faf7]'}`}>
            <Icon size={16} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="min-w-0 space-y-5">{children}</div>
    </section>
  );
}
