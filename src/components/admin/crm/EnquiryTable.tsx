import { Link } from 'react-router';
import { ArrowUpRight, Building2, Mail } from 'lucide-react';
import type { CrmEnquiry } from '../../../types/crm';
import StatusBadge from './StatusBadge';
import { crmDate } from '../../../lib/crm/format';

export default function EnquiryTable({ records }: { records: CrmEnquiry[] }) {
  if (!records.length) return null;

  return (
    <div className="w-full min-w-0 overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left font-sans">
        <thead className="bg-[#f7faf9]">
          <tr className="border-b border-[#e9efed]">
            {['Reference', 'Customer', 'Company', 'Status', 'Created', 'Action'].map((header) => (
              <th key={header} scope="col" className="px-5 py-3.5 !text-[11px] !font-extrabold !uppercase !tracking-[0.09em] !text-[#71858c] first:pl-6 last:pr-6">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef2f0]">
          {records.map((entry) => (
            <tr key={entry.id} className="group transition-colors duration-200 hover:bg-[#f6fbf8]">
              <td className="whitespace-nowrap py-4 pl-6 pr-5 align-middle">
                <span className="inline-flex rounded-lg bg-[#edf5f1] px-2.5 py-1.5 !text-[12px] !font-bold !text-[#0d6255]">
                  {entry.reference || '—'}
                </span>
              </td>
              <td className="max-w-[260px] px-5 py-4 align-middle">
                <p className="!m-0 truncate !text-[13px] !font-bold !text-[#18343c]">{entry.full_name || 'Unknown customer'}</p>
                <p className="!mb-0 !mt-1 flex items-center gap-1.5 truncate !text-[12px] !text-[#73878d]">
                  <Mail size={12} className="shrink-0" aria-hidden="true" />
                  <span className="truncate">{entry.email || 'No email supplied'}</span>
                </p>
              </td>
              <td className="max-w-[190px] px-5 py-4 align-middle">
                <span className="inline-flex min-w-0 items-center gap-2 !text-[12px] !font-medium !text-[#4e6670]">
                  <Building2 size={15} className="shrink-0 text-[#94a8ac]" aria-hidden="true" />
                  <span className="truncate" title={entry.company || ''}>{entry.company || '—'}</span>
                </span>
              </td>
              <td className="whitespace-nowrap px-5 py-4 align-middle"><StatusBadge status={entry.status} /></td>
              <td className="whitespace-nowrap px-5 py-4 !text-[12px] !text-[#657981] align-middle">{crmDate(entry.created_at)}</td>
              <td className="py-4 pl-5 pr-6 text-right align-middle">
                <Link
                  to={`/admin/enquiries/${entry.id}`}
                  aria-label={`View enquiry ${entry.reference || entry.id}`}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#cfe3db] bg-white px-3 py-2 !text-[12px] !font-bold !text-[#0d6255] transition hover:border-[#0d7363] hover:!bg-[#eaf6f0]"
                >
                  View details <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
