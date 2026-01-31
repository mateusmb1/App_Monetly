-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==========================================
-- 0. CLEANUP (For Reset)
-- ==========================================
drop table if exists public.reminders cascade;
drop table if exists public.debt_plans cascade;
drop table if exists public.budgets cascade;
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
  interest_rate numeric default 0,
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
  salary_can_vary boolean default false,
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
  down_payment numeric default 0,
  installment_type text check (installment_type in ('fixed', 'variable')) default 'fixed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- BUDGETS
create table public.budgets (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  category text not null,
  amount numeric not null,
  month integer not null,
  year integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(group_id, category, month, year)
);

-- DEBT PLANS
create table public.debt_plans (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  debt_type text check (debt_type in ('credit_card', 'loan', 'generic')) not null,
  related_account_id uuid references public.accounts(id),
  target_months integer,
  planned_monthly_amount numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- REMINDERS / CHECK-INS
create table public.reminders (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.profiles(id) not null,
  type text not null, -- 'daily_checkin', 'salary_confirmation'
  last_notified_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 1.1 INDEXES FOR PERFORMANCE
-- ==========================================

create index idx_profiles_id on public.profiles(id);
create index idx_groups_owner_id on public.groups(owner_id);
create index idx_group_members_group_id on public.group_members(group_id);
create index idx_group_members_user_id on public.group_members(user_id);
create index idx_accounts_group_id on public.accounts(group_id);
create index idx_incomes_group_id on public.incomes(group_id);
create index idx_incomes_user_id on public.incomes(user_id);
create index idx_expenses_group_id on public.expenses(group_id);
create index idx_expenses_user_id on public.expenses(user_id);
create index idx_expenses_account_id on public.expenses(account_id);
create index idx_financings_group_id on public.financings(group_id);
create index idx_budgets_group_id on public.budgets(group_id);
create index idx_debt_plans_group_id on public.debt_plans(group_id);
create index idx_reminders_group_id on public.reminders(group_id);

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
alter table public.budgets enable row level security;
alter table public.debt_plans enable row level security;
alter table public.reminders enable row level security;

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

-- BUDGETS
create policy "Group members can view budgets" on public.budgets
  for select using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = budgets.group_id
      and group_members.user_id = auth.uid()
    )
  );

create policy "Group members can manage budgets" on public.budgets
  for all using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = budgets.group_id
      and group_members.user_id = auth.uid()
    )
  );

-- DEBT PLANS
create policy "Group members can view debt_plans" on public.debt_plans
  for select using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = debt_plans.group_id
      and group_members.user_id = auth.uid()
    )
  );

create policy "Group members can manage debt_plans" on public.debt_plans
  for all using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = debt_plans.group_id
      and group_members.user_id = auth.uid()
    )
  );

-- REMINDERS
create policy "Group members can view reminders" on public.reminders
  for select using (
    exists (
      select 1 from public.group_members
      where group_members.group_id = reminders.group_id
      and group_members.user_id = auth.uid()
    )
  );

create policy "Users can manage own reminders" on public.reminders
  for all using (user_id = auth.uid());

-- ==========================================
-- 4. TRIGGERS
-- ==========================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, avatar_url)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', 'Usuário'), 
    new.email, 
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid error on rerun
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
