-- ConXport homepage services: image and title only.
-- Run once in Supabase SQL Editor (or apply through your normal migration workflow).
create table if not exists public.home_services (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) between 1 and 120),
  image_url text not null check (char_length(btrim(image_url)) > 0),
  created_at timestamptz not null default now()
);

alter table public.home_services enable row level security;

drop policy if exists "services readable publicly" on public.home_services;
create policy "services readable publicly" on public.home_services
  for select to anon, authenticated using (true);

drop policy if exists "services admin insert" on public.home_services;
create policy "services admin insert" on public.home_services
  for insert to authenticated
  with check ((select public.is_conxport_admin()));

drop policy if exists "services admin update" on public.home_services;
create policy "services admin update" on public.home_services
  for update to authenticated
  using ((select public.is_conxport_admin()))
  with check ((select public.is_conxport_admin()));

drop policy if exists "services admin delete" on public.home_services;
create policy "services admin delete" on public.home_services
  for delete to authenticated
  using ((select public.is_conxport_admin()));

grant select on public.home_services to anon, authenticated;
grant insert, update, delete on public.home_services to authenticated;
-- Image uploads use the EXISTING product-public bucket through uploadCmsImage.
-- No new storage bucket or policy required if your existing CMS image uploads work.
