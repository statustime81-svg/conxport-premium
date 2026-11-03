-- All private writes happen through security-checked server functions.
create or replace function public.is_conxport_admin()
returns boolean language sql stable security definer
set search_path = '' as $$
 select exists (select 1 from public.admin_users where user_id = (select auth.uid()));
$$;
revoke all on function public.is_conxport_admin() from public;
grant execute on function public.is_conxport_admin() to anon, authenticated;

alter table public.profiles enable row level security;
alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_categories enable row level security;
alter table public.product_media enable row level security;
alter table public.product_documents enable row level security;
alter table public.warehouses enable row level security;
alter table public.inventory_balances enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.enquiries enable row level security;
alter table public.enquiry_items enable row level security;
alter table public.saved_products enable row level security;

create policy "profiles owner read" on public.profiles for select to authenticated using (id = (select auth.uid()) or (select public.is_conxport_admin()));
create policy "profiles owner insert" on public.profiles for insert to authenticated with check (id = (select auth.uid()));
create policy "profiles owner update" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "admin membership self read" on public.admin_users for select to authenticated using (user_id = (select auth.uid()));
create policy "categories public read" on public.categories for select to anon, authenticated using (is_published or (select public.is_conxport_admin()));
create policy "products public read" on public.products for select to anon, authenticated using (is_published or (select public.is_conxport_admin()));
create policy "product categories public read" on public.product_categories for select to anon, authenticated using (
  exists(select 1 from public.products p where p.id = product_id and p.is_published)
  or (select public.is_conxport_admin())
);
create policy "product media public read" on public.product_media for select to anon, authenticated using (
  exists(select 1 from public.products p where p.id = product_id and p.is_published)
  or (select public.is_conxport_admin())
);
create policy "document metadata admin read" on public.product_documents for select to authenticated using ((select public.is_conxport_admin()));
create policy "warehouses admin read" on public.warehouses for select to authenticated using ((select public.is_conxport_admin()));
create policy "inventory balances admin read" on public.inventory_balances for select to authenticated using ((select public.is_conxport_admin()));
create policy "inventory movements admin read" on public.inventory_movements for select to authenticated using ((select public.is_conxport_admin()));
create policy "enquiries owner/admin read" on public.enquiries for select to authenticated using (user_id = (select auth.uid()) or (select public.is_conxport_admin()));
create policy "enquiry items owner/admin read" on public.enquiry_items for select to authenticated using (
  exists(select 1 from public.enquiries e where e.id = enquiry_id and (e.user_id = (select auth.uid()) or (select public.is_conxport_admin())))
);
create policy "saved products self read" on public.saved_products for select to authenticated using (user_id = (select auth.uid()));
create policy "saved products self insert" on public.saved_products for insert to authenticated with check (user_id = (select auth.uid()));
create policy "saved products self delete" on public.saved_products for delete to authenticated using (user_id = (select auth.uid()));
-- Admin catalogue and inventory mutations will be added as audited RPC/Edge functions in a later batch.
