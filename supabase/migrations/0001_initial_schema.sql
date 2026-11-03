-- Batch 65-74: foundation schema. Apply in order to a new TEST Supabase project.
create extension if not exists pgcrypto;
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, company text, created_at timestamptz not null default now()
);
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete restrict,
  name text not null, slug text not null unique,
  description text, is_published boolean not null default false,
  created_at timestamptz not null default now(),
  constraint category_not_own_parent check (id is distinct from parent_id)
);
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  primary_category_id uuid references public.categories(id) on delete set null,
  name text not null, slug text not null unique, sku text not null unique,
  summary text, description text, is_published boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.product_categories (
  product_id uuid not null references public.products(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  primary key(product_id, category_id)
);
create table if not exists public.product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null, media_type text not null check(media_type in ('image','video','model','spin')),
  sort_order integer not null default 0
);
create table if not exists public.product_documents (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  title text not null, storage_path text not null, requires_enquiry boolean not null default true
);
create table if not exists public.warehouses (
  id uuid primary key default gen_random_uuid(), name text not null, code text not null unique
);
create table if not exists public.inventory_balances (
  product_id uuid not null references public.products(id) on delete restrict,
  warehouse_id uuid not null references public.warehouses(id) on delete restrict,
  quantity integer not null default 0 check(quantity >= 0),
  low_stock_threshold integer not null default 0 check(low_stock_threshold >= 0),
  primary key(product_id, warehouse_id)
);
create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete restrict,
  warehouse_id uuid not null references public.warehouses(id) on delete restrict,
  delta integer not null check(delta <> 0),
  reason text not null, actor_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default ('CX-' || upper(substr(replace(gen_random_uuid()::text,'-',''), 1, 12))),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null, email text not null, phone text not null,
  company text not null, country text not null, city text,
  buyer_type text not null check(buyer_type in ('hospital','laboratory','distributor','institution','individual','other')),
  quantity integer not null check(quantity between 1 and 100000),
  requirements text not null, status text not null default 'new'
    check(status in ('new','contacted','quoted','closed_won','closed_lost')),
  created_at timestamptz not null default now()
);
create table if not exists public.enquiry_items (
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null default 1 check(quantity > 0),
  primary key(enquiry_id, product_id)
);
create table if not exists public.saved_products (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id, product_id)
);
create index if not exists idx_categories_parent on public.categories(parent_id);
create index if not exists idx_products_category on public.products(primary_category_id);
create index if not exists idx_enquiries_user on public.enquiries(user_id, created_at desc);
create index if not exists idx_enquiries_email_date on public.enquiries(lower(email), created_at desc);
