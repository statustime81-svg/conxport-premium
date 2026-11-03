-- Migration 0008, run after 0001-0007. Preserves existing content.
create table if not exists public.cms_entries (
 id uuid primary key default gen_random_uuid(),
 kind text not null check(kind in ('page','blog','case_study','resource','homepage')),
 slug text not null check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 title text not null check(char_length(btrim(title)) between 2 and 180),
 excerpt text not null default '' check(char_length(excerpt)<=500),
 body text not null default '' check(char_length(body)<=100000),
 image_url text,
 external_url text,
 seo_title text not null default '' check(char_length(seo_title)<=70),
 seo_description text not null default '' check(char_length(seo_description)<=180),
 is_published boolean not null default false,
 published_at timestamptz,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(kind,slug)
);
create index if not exists cms_public_lookup on public.cms_entries(kind,is_published,published_at desc);
alter table public.cms_entries enable row level security;
revoke all on public.cms_entries from anon,authenticated;
grant select on public.cms_entries to anon,authenticated;
grant insert,update,delete on public.cms_entries to authenticated;
drop policy if exists "cms public published" on public.cms_entries;
create policy "cms public published" on public.cms_entries for select to anon,authenticated
 using (is_published or (select public.is_conxport_admin()));
drop policy if exists "cms admin insert" on public.cms_entries;
create policy "cms admin insert" on public.cms_entries for insert to authenticated
 with check ((select public.is_conxport_admin()));
drop policy if exists "cms admin update" on public.cms_entries;
create policy "cms admin update" on public.cms_entries for update to authenticated
 using ((select public.is_conxport_admin())) with check ((select public.is_conxport_admin()));
drop policy if exists "cms admin delete" on public.cms_entries;
create policy "cms admin delete" on public.cms_entries for delete to authenticated
 using ((select public.is_conxport_admin()));
-- This table stores plain text, not trusted HTML; do not interpolate body as HTML.
