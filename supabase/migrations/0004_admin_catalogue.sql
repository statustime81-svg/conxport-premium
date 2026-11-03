-- Apply after 0001 and 0002. Run once in Supabase SQL editor.
-- Admin writes are explicitly restricted by RLS. No public product writes.
create policy "admin product insert" on public.products for insert to authenticated
with check ((select public.is_conxport_admin()));
create policy "admin product update" on public.products for update to authenticated
using ((select public.is_conxport_admin())) with check ((select public.is_conxport_admin()));
create policy "admin product delete" on public.products for delete to authenticated
using ((select public.is_conxport_admin()));
create policy "admin category insert" on public.categories for insert to authenticated
with check ((select public.is_conxport_admin()));
create policy "admin category update" on public.categories for update to authenticated
using ((select public.is_conxport_admin())) with check ((select public.is_conxport_admin()));
create policy "admin category delete" on public.categories for delete to authenticated
using ((select public.is_conxport_admin()));
create policy "admin product categories insert" on public.product_categories for insert to authenticated
with check ((select public.is_conxport_admin()));
create policy "admin product categories delete" on public.product_categories for delete to authenticated
using ((select public.is_conxport_admin()));
-- Bound sizes and printable identifiers; existing invalid rows must be cleaned first.
alter table public.products add constraint cx_product_name_length check (char_length(trim(name)) between 2 and 160);
alter table public.products add constraint cx_product_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 160);
alter table public.products add constraint cx_product_sku_length check (char_length(trim(sku)) between 2 and 80);
