-- Run after 0009. Admin-controlled sections + independent contact inbox.
create table if not exists public.site_showcase (
 id uuid primary key default gen_random_uuid(),
 kind text not null check(kind in ('testimonial','client','certificate','expo_photo','expo_video','faq')),
 title text not null default '', body text not null default '',
 media_url text, sort_order int not null default 0,
 is_published boolean not null default true,
 created_at timestamptz not null default now()
);
create index if not exists showcase_public_order on public.site_showcase(kind,is_published,sort_order);
alter table public.site_showcase enable row level security;
grant select on public.site_showcase to anon,authenticated;
grant insert,update,delete on public.site_showcase to authenticated;
create policy "showcase published" on public.site_showcase for select to anon,authenticated using (is_published or (select public.is_conxport_admin()));
create policy "showcase admin insert" on public.site_showcase for insert to authenticated with check ((select public.is_conxport_admin()));
create policy "showcase admin update" on public.site_showcase for update to authenticated using ((select public.is_conxport_admin())) with check ((select public.is_conxport_admin()));
create policy "showcase admin delete" on public.site_showcase for delete to authenticated using ((select public.is_conxport_admin()));
create table if not exists public.contact_messages (
 id uuid primary key default gen_random_uuid(),
 full_name text not null check (char_length(trim(full_name)) between 2 and 150),
 email text not null check (char_length(email) between 5 and 254),
 phone text not null default '',
 subject text not null default '',
 message text not null check (char_length(trim(message)) between 10 and 5000),
 status text not null default 'new' check(status in ('new','in_progress','resolved')),
 created_at timestamptz not null default now()
);
create index if not exists contact_messages_newest on public.contact_messages(created_at desc);
alter table public.contact_messages enable row level security;
grant insert on public.contact_messages to anon,authenticated;
grant select,update,delete on public.contact_messages to authenticated;
create policy "contact public submit" on public.contact_messages for insert to anon,authenticated with check (status = 'new');
create policy "contact admin read" on public.contact_messages for select to authenticated using ((select public.is_conxport_admin()));
create policy "contact admin update" on public.contact_messages for update to authenticated using ((select public.is_conxport_admin())) with check ((select public.is_conxport_admin()));
create policy "contact admin delete" on public.contact_messages for delete to authenticated using ((select public.is_conxport_admin()));
-- Use existing admin-gated product-public bucket for showcase media.
