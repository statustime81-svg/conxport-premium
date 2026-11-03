-- Batch 253: site settings + admin-managed storage uploads
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.site_settings enable row level security;

drop policy if exists "site settings admin read" on public.site_settings;
drop policy if exists "site settings public read" on public.site_settings;
create policy "site settings public read" on public.site_settings
for select to anon, authenticated
using (true);

drop policy if exists "site settings admin insert" on public.site_settings;
create policy "site settings admin insert" on public.site_settings
for insert to authenticated
with check ((select public.is_conxport_admin()));

drop policy if exists "site settings admin update" on public.site_settings;
create policy "site settings admin update" on public.site_settings
for update to authenticated
using ((select public.is_conxport_admin()))
with check ((select public.is_conxport_admin()));

drop policy if exists "site settings admin delete" on public.site_settings;
create policy "site settings admin delete" on public.site_settings
for delete to authenticated
using ((select public.is_conxport_admin()));

insert into public.site_settings(key, value)
values
  ('general', jsonb_build_object(
    'companyName', 'ConXport',
    'tagline', 'Premium medical equipment sourcing for hospitals, laboratories and institutions.',
    'supportEmail', 'info@conxport.com',
    'supportPhone', '+91 90000 00000',
    'whatsapp', '+91 90000 00000',
    'address', 'Add your registered business address here',
    'city', 'Patna',
    'country', 'India'
  )),
  ('seo', jsonb_build_object(
    'siteTitle', 'ConXport',
    'siteDescription', 'Premium medical equipment sourcing for hospitals, laboratories and institutions.',
    'siteUrl', 'https://www.example.com',
    'defaultOgImage', '',
    'robotsIndex', true
  ))
on conflict (key) do nothing;

-- Allow authenticated administrators to manage uploads in the existing public bucket.
drop policy if exists "admin manage product-public uploads" on storage.objects;
create policy "admin manage product-public uploads" on storage.objects
for all to authenticated
using (bucket_id = 'product-public' and (select public.is_conxport_admin()))
with check (bucket_id = 'product-public' and (select public.is_conxport_admin()));
