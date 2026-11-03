-- Run after migrations 0001-0006. No existing enquiry records are deleted.
create table if not exists public.enquiry_notes (
 id uuid primary key default gen_random_uuid(),
 enquiry_id uuid not null references public.enquiries(id) on delete cascade,
 author_id uuid not null references auth.users(id),
 body text not null check(char_length(btrim(body)) between 1 and 3000),
 created_at timestamptz not null default now()
);
create index if not exists idx_enquiry_notes_enquiry on public.enquiry_notes(enquiry_id,created_at desc);
alter table public.enquiry_notes enable row level security;
drop policy if exists "crm admin read notes" on public.enquiry_notes;
create policy "crm admin read notes" on public.enquiry_notes for select to authenticated using ((select public.is_conxport_admin()));
drop policy if exists "crm admin add notes" on public.enquiry_notes;
create policy "crm admin add notes" on public.enquiry_notes for insert to authenticated with check ((select public.is_conxport_admin()) and author_id=(select auth.uid()));
-- Restrict access: only a logged-in administrator may change an enquiry status.
drop policy if exists "crm admin update enquiry" on public.enquiries;
create policy "crm admin update enquiry" on public.enquiries for update to authenticated using ((select public.is_conxport_admin())) with check ((select public.is_conxport_admin()));
-- Protect original enquiry payload from mutation using a strict column privilege.
revoke update on public.enquiries from authenticated;
grant select on public.enquiries to authenticated;
grant update(status) on public.enquiries to authenticated;
grant select, insert on public.enquiry_notes to authenticated;
-- Customer email, phone and company remain on enquiries; do not expose guest enquiries to other customers.
