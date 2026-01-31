-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==========================================
-- 0. CLEANUP (For Reset)
-- ==========================================
drop table if exists public.financings cascade;
drop table if exists public.expenses cascade;
drop table if exists public.incomes cascade;
drop table if exists public.accounts cascade;
drop table if exists public.group_members cascade;
drop table if exists public.groups cascade;
drop table if exists public.profiles cascade;

-- ==========================================
-- 1. TABLES CREATION
-- ==========================================

-- PROFILES (Syncs with Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  email text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- GROUPS
create table public.groups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  owner_id uuid references public.profiles(id) not null,
  currency text default 'BRL',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- GROUP MEMBERS
create table public.group_members (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text check (role in ('owner', 'member')) default 'member',
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(group_id, user_id)
);

-- ACCOUNTS
create table public.accounts (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  name text not null,
  type text check (type in ('cash', 'bank', 'credit_card')) not null,
  balance numeric default 0,
  limit_total numeric,
  closing_day integer,
  due_day integer,
  total_debt numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- INCOMES
create table public.incomes (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.profiles(id) not null,
  amount numeric not null,
  date date not null,
  description text,
  type text check (type in ('fixed', 'variable')),
  source text,
  recurrence text,
  is_salary boolean default false,
  account_id uuid references public.accounts(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- EXPENSES
create table public.expenses (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.profiles(id) not null,
  amount numeric not null,
  date date not null,
  description text,
  category text,
  recurrence text,
  is_fixed boolean default false,
  is_variable_recurrent boolean default false,
  is_unexpected boolean default false,
  payment_method text,
  account_id uuid references public.accounts(id),
  is_paid boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- FINANCINGS
create table public.financings (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.profiles(id) not null,
  type text,
  name text not null,
  principal_amount numeric not null,
  total_months integer not null,
  start_date date not null,
  installment_amount numeric not null,
  paid_installments_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 2. ENABLE RLS
-- ==========================================

alter table public.profiles enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.accounts enable row level security;
alter table public.incomes enable row level security;
alter table public.expenses enable row level security;
alter table public.financings enable row level security;

-- ==========================================
-- 3. POLICIES CREATION
-- ==========================================

-- PROFILES
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- GROUPS
create policy "Members can view groups" on public.groups
  for select using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = groups.id
      and group_members.user_id = auth.uid()
    )
  );

create policy "Users can create groups" on public.groups
  for insert with check (auth.uid() = owner_id);

-- GROUP MEMBERS
create policy "Members can view group members" on public.group_members
  for select using (
    exists (
      select 1 from public.group_members as gm
      where gm.group_id = group_members.group_id
      and gm.user_id = auth.uid()
    )
  );
  
-- Allow users to insert themselves as members (usually done via invite logic, but for now allow creates if related to owned group)
-- Simplified: Only allow insert if you are the user being added AND you are adding to a group you own OR invite logic (omitted for brevity)
-- For the prototype, we assume the trigger or backend handles initial member creation. 
-- Let's allow users to see their own membership rows always.
create policy "Users can view own membership" on public.group_members
    for select using (user_id = auth.uid());


-- ACCOUNTS
create policy "Group members can view accounts" on public.accounts
  for select using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = accounts.group_id
      and group_members.user_id = auth.uid()
    )
  );

create policy "Group members can manage accounts" on public.accounts
  for all using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = accounts.group_id
      and group_members.user_id = auth.uid()
    )
  );

-- INCOMES
create policy "Group members can view incomes" on public.incomes
  for select using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = incomes.group_id
      and group_members.user_id = auth.uid()
    )
  );

create policy "Group members can manage incomes" on public.incomes
  for all using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = incomes.group_id
      and group_members.user_id = auth.uid()
    )
  );

-- EXPENSES
create policy "Group members can view expenses" on public.expenses
  for select using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = expenses.group_id
      and group_members.user_id = auth.uid()
    )
  );

create policy "Group members can manage expenses" on public.expenses
  for all using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = expenses.group_id
      and group_members.user_id = auth.uid()
    )
  );

-- FINANCINGS
create policy "Group members can view financings" on public.financings
  for select using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = financings.group_id
      and group_members.user_id = auth.uid()
    )
  );

create policy "Group members can manage financings" on public.financings
  for all using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = financings.group_id
      and group_members.user_id = auth.uid()
    )
  );

-- ==========================================
-- 4. TRIGGERS
-- ==========================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, avatar_url)
  values (new.id, new.raw_user_meta_data->>'name', new.email, new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid error on rerun
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
