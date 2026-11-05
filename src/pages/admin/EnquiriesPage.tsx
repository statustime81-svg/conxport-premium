import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight, CheckCircle2, Clock3, FileCheck2, Inbox,
  RefreshCw, SearchX, ShieldCheck,
} from 'lucide-react';
import CrmFilters from '../../components/admin/crm/CrmFilters';
import EnquiryTable from '../../components/admin/crm/EnquiryTable';
import { useCrmResource } from '../../hooks/useCrmResource';
import { getCrmEnquiries } from '../../services/crmEnquiries';
import type { CrmEnquiry } from '../../types/crm';

type MetricProps = {
  label: string;
  value: number;
  icon: typeof Inbox;
  color: string;
  background: string;
};

function Metric({ label, value, icon: Icon, color, background }: MetricProps) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#e3ebe9] bg-white p-4 shadow-[0_3px_18px_rgba(20,51,59,0.025)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="!m-0 !text-[12px] !font-semibold !text-[#647782] sm:!text-[13px]">{label}</p>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${background}`}>
          <Icon size={18} className={color} strokeWidth={1.9} aria-hidden="true" />
        </span>
      </div>
      <p className="!mb-0 !mt-3 !text-[29px] !font-extrabold !leading-none !tracking-[-0.04em] !text-[#162f37] sm:!text-[34px]">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export default function EnquiriesPage() {
  const loader = useCallback(getCrmEnquiries, []);
  const { data, loading, error, reload } = useCrmResource<CrmEnquiry[]>(loader, []);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const rows = data ?? [];
  const records = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return rows.filter((entry) => {
      if (status && entry.status !== status) return false;
      if (!term) return true;
      return [entry.reference, entry.full_name, entry.email, entry.company]
        .map((value) => String(value ?? ''))
        .join(' ')
        .toLocaleLowerCase()
        .includes(term);
    });
  }, [rows, search, status]);

  const newCount = rows.filter((entry) => entry.status === 'new').length;
  const quotedCount = rows.filter((entry) => entry.status === 'quoted').length;
  const wonCount = rows.filter((entry) => entry.status === 'closed_won').length;
  const hasFilters = Boolean(search || status);

  return (
    <section className="w-full min-w-0 space-y-6 pb-12 font-sans text-[#16313a]">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="!m-0 !text-[11px] !font-extrabold !uppercase !tracking-[0.15em] !text-[#07546B]">
            CRM / ENQUIRIES
          </p>
          <h1 className="!mb-0 !mt-2 !text-[27px] !font-extrabold !leading-tight !tracking-[-0.035em] !text-[#162f37] sm:!text-[32px]">
            Enquiry Management
          </h1>
          <p className="!mb-0 !mt-2 max-w-[650px] !text-[13px] !leading-relaxed !text-[#637782] sm:!text-[14px]">
            Review customer requests, track quotation progress and open enquiry details.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void reload()}
          disabled={loading}
          className="group inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#d8e5e0] !bg-white px-4 !text-[13px] !font-bold !text-[#07546B] transition hover:!border-[#a0cfc1] hover:!bg-[#f0f8f4] disabled:cursor-wait disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : 'transition-transform duration-300 group-hover:rotate-90'} aria-hidden="true" />
          Refresh enquiries
        </button>
      </header>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Metric label="Total enquiries" value={rows.length} icon={Inbox} color="text-[#07546B]" background="bg-[#e9f5f1]" />
        <Metric label="New enquiries" value={newCount} icon={Clock3} color="text-[#2563eb]" background="bg-[#eff6ff]" />
        <Metric label="Quotes sent" value={quotedCount} icon={FileCheck2} color="text-[#a16207]" background="bg-[#fffbeb]" />
        <Metric label="Closed won" value={wonCount} icon={CheckCircle2} color="text-[#15803d]" background="bg-[#f0fdf4]" />
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 !text-[13px] !text-[#b91c1c]">
          Unable to load enquiries: {error}
        </div>
      )}

      <div className="min-w-0 overflow-hidden rounded-2xl border border-[#e0e9e7] bg-white shadow-[0_5px_28px_rgba(18,55,57,0.035)]">
        <div className="border-b border-[#edf1f1] px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="!m-0 !text-[17px] !font-extrabold !tracking-[-0.02em] !text-[#18333d]">
                All enquiries
              </h2>
              <p className="!mb-0 !mt-1 !text-[12px] !text-[#74858d]">
                {loading ? 'Updating enquiries…' : `${records.length} matching ${records.length === 1 ? 'enquiry' : 'enquiries'} from the latest records`}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E7F5F7] px-3 py-1.5 !text-[11px] !font-bold !text-[#07546B]">
              <ShieldCheck size={14} aria-hidden="true" /> Admin only
            </span>
          </div>
          <div className="mt-5">
            <CrmFilters search={search} onSearch={setSearch} status={status} onStatus={setStatus} />
          </div>
        </div>

        {loading && rows.length === 0 ? (
          <div role="status" className="space-y-3 px-5 py-8">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="h-14 animate-pulse rounded-xl bg-[#f1f5f4]" />
            ))}
          </div>
        ) : records.length ? (
          <EnquiryTable records={records} />
        ) : (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#eff6f4]">
              <SearchX size={25} className="text-[#669c90]" aria-hidden="true" />
            </span>
            <h3 className="!mb-0 !mt-4 !text-[16px] !font-bold !text-[#19343d]">
              {hasFilters ? 'No matching enquiries' : 'No enquiries yet'}
            </h3>
            <p className="!mb-0 !mt-2 max-w-[420px] !text-[13px] !leading-relaxed !text-[#6e828a]">
              {hasFilters ? 'Try another customer name, reference or status.' : 'New customer enquiries will appear here when submitted.'}
            </p>
            {hasFilters && (
              <button type="button" onClick={() => { setSearch(''); setStatus(''); }} className="mt-5 rounded-lg border border-[#cddfd7] px-4 py-2 !text-[12px] !font-bold !text-[#07546B] hover:!bg-[#E7F5F7]">
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 !text-[12px] !text-[#71818a]">
        <p className="!m-0">Enquiry records are visible only to authorized admin users.</p>
        <Link to="/admin/customers" className="inline-flex items-center gap-1 !font-semibold !text-[#07546B] hover:underline">
          Manage customers <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
