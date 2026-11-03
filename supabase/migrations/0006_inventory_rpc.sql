-- Run AFTER migrations 0001-0005. Atomic stock transactions and admin-only access.
create policy "cx admin warehouses insert" on public.warehouses for insert to authenticated with check ((select public.is_conxport_admin()));
create policy "cx admin warehouses update" on public.warehouses for update to authenticated using ((select public.is_conxport_admin())) with check ((select public.is_conxport_admin()));
create policy "cx admin warehouses delete" on public.warehouses for delete to authenticated using ((select public.is_conxport_admin()));
-- Balances and movements deliberately have no client write policies.
create or replace function public.cx_adjust_stock(p_product_id uuid,p_warehouse_id uuid,p_delta integer,p_reason text)
returns integer language plpgsql security definer set search_path = '' as $$
declare v_quantity integer;
begin
  if auth.uid() is null or not public.is_conxport_admin() then raise exception 'Administrator access required' using errcode='42501'; end if;
  if p_delta is null or p_delta=0 or abs(p_delta::bigint)>100000 then raise exception 'Invalid stock delta'; end if;
  if p_reason is null or length(btrim(p_reason))<3 or length(p_reason)>300 then raise exception 'Reason must be 3-300 characters'; end if;
  if not exists(select 1 from public.products where id=p_product_id) then raise exception 'Unknown product'; end if;
  if not exists(select 1 from public.warehouses where id=p_warehouse_id) then raise exception 'Unknown warehouse'; end if;
  insert into public.inventory_balances(product_id,warehouse_id,quantity) values(p_product_id,p_warehouse_id,0)
  on conflict(product_id,warehouse_id) do nothing;
  update public.inventory_balances set quantity=quantity+p_delta
  where product_id=p_product_id and warehouse_id=p_warehouse_id and quantity+p_delta>=0
  returning quantity into v_quantity;
  if v_quantity is null then raise exception 'Insufficient stock'; end if;
  insert into public.inventory_movements(product_id,warehouse_id,delta,reason,actor_id)
  values(p_product_id,p_warehouse_id,p_delta,btrim(p_reason),auth.uid());
  return v_quantity;
end $$;
revoke all on function public.cx_adjust_stock(uuid,uuid,integer,text) from public,anon;
grant execute on function public.cx_adjust_stock(uuid,uuid,integer,text) to authenticated;
create or replace function public.cx_set_low_stock_threshold(p_product_id uuid,p_warehouse_id uuid,p_threshold integer)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null or not public.is_conxport_admin() then raise exception 'Administrator access required' using errcode='42501'; end if;
  if p_threshold is null or p_threshold<0 or p_threshold>1000000 then raise exception 'Invalid threshold'; end if;
  if not exists(select 1 from public.products where id=p_product_id) then raise exception 'Unknown product'; end if;
  if not exists(select 1 from public.warehouses where id=p_warehouse_id) then raise exception 'Unknown warehouse'; end if;
  insert into public.inventory_balances(product_id,warehouse_id,quantity,low_stock_threshold)
  values(p_product_id,p_warehouse_id,0,p_threshold)
  on conflict(product_id,warehouse_id) do update set low_stock_threshold=excluded.low_stock_threshold;
end $$;
revoke all on function public.cx_set_low_stock_threshold(uuid,uuid,integer) from public,anon;
grant execute on function public.cx_set_low_stock_threshold(uuid,uuid,integer) to authenticated;
create index if not exists cx_inventory_movements_date_idx on public.inventory_movements(created_at desc);
create index if not exists cx_inventory_movements_pair_idx on public.inventory_movements(product_id,warehouse_id,created_at desc);
