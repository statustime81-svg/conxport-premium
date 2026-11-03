-- ConXport category image support. Run once AFTER existing migrations.
-- Keep separate from product images; both public display and admin upload are RLS controlled.
begin;

alter table public.categories add column if not exists image_url text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('category-public', 'category-public', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "category images public read" on storage.objects;
create policy "category images public read" on storage.objects
for select to anon, authenticated
using (bucket_id = 'category-public');

drop policy if exists "category images admin insert" on storage.objects;
create policy "category images admin insert" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'category-public'
  and (select public.is_conxport_admin())
  and storage.extension(name) in ('jpg','png','webp')
  and name ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.(jpg|png|webp)$'
);

-- Image objects are left intact when category image is replaced or a category is deleted.
-- This avoids breaking any previously published URL; optional cleanup can be done separately.
commit;
