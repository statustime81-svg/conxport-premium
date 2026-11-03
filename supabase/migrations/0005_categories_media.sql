-- Run once after migrations 0001-0004. Admin authorization is enforced in RLS.
-- Category writes; media writes never allowed to non-admins.
begin;
create policy "admin product media insert" on public.product_media for insert to authenticated with check ((select public.is_conxport_admin()));
create policy "admin product media update" on public.product_media for update to authenticated using ((select public.is_conxport_admin())) with check ((select public.is_conxport_admin()));
create policy "admin product media delete" on public.product_media for delete to authenticated using ((select public.is_conxport_admin()));
-- Objects are protected by the storage policies, not by a hidden frontend control.
create policy "admin product image upload" on storage.objects for insert to authenticated with check (
 bucket_id = 'product-public' and (select public.is_conxport_admin())
 and (storage.extension(name) in ('jpg','jpeg','png','webp'))
 and name ~ '^[0-9a-f-]{36}/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$'
);
create policy "admin product image delete" on storage.objects for delete to authenticated using (
 bucket_id = 'product-public' and (select public.is_conxport_admin())
);
-- Only the image formats listed above are supported; bucket limit = 10MB.
commit;
