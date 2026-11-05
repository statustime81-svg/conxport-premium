import { Search, SlidersHorizontal } from 'lucide-react';
import type { EnquiryStatus } from '../../../types/crm';
import { CRM_STATUSES } from '../../../types/crm';
import { crmStatusLabel } from '../../../lib/crm/format';

type CrmFiltersProps = {
  search: string;
  onSearch: (value: string) => void;
  status: string;
  onStatus: (value: string) => void;
};

export default function CrmFilters({ search, onSearch, status, onStatus }: CrmFiltersProps) {
  return (
    <div className="grid w-full min-w-0 gap-3 md:grid-cols-[minmax(0,1fr)_230px]">
      <label className="relative block min-w-0">
        <span className="sr-only">Search enquiries</span>
        <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86969d]" />
        <input
          type="search"
          aria-label="Search enquiries"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search reference, customer, email or company..."
          className="block h-11 w-full min-w-0 rounded-xl border border-[#dae5e2] !bg-white py-2.5 pl-11 pr-4 !text-[13px] !text-[#17343c] outline-none placeholder:!text-[#98a6ac] transition focus:border-[#07546B] focus:ring-2 focus:ring-[#07546B]/10"
        />
      </label>
      <label className="relative block min-w-0">
        <span className="sr-only">Filter by status</span>
        <SlidersHorizontal size={17} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#778d94]" />
        <select
          aria-label="Filter by status"
          value={status}
          onChange={(event) => onStatus(event.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-[#dae5e2] !bg-white py-2.5 pl-10 pr-8 !text-[13px] !font-semibold !text-[#17343c] outline-none transition focus:border-[#07546B] focus:ring-2 focus:ring-[#07546B]/10"
        >
          <option value="">All statuses</option>
          {CRM_STATUSES.map((entry: EnquiryStatus) => (
            <option key={entry} value={entry}>{crmStatusLabel(entry)}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
