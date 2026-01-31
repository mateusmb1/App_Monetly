-- ==========================================
-- AUDIT FIX MIGRATION
-- ==========================================

-- 1. Missing Entities
-- BUDGETS
create table if not exists public.budgets (
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
create table if not exists public.debt_plans (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  debt_type text check (debt_type in ('credit_card', 'loan', 'generic')) not null,
  related_account_id uuid references public.accounts(id),
  target_months integer,
  planned_monthly_amount numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- REMINDERS / CHECK-INS
create table if not exists public.reminders (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.profiles(id) not null,
  type text not null, -- 'daily_checkin', 'salary_confirmation'
  last_notified_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Schema Patches
-- Accounts: Add interest_rate
alter table public.accounts add column if not exists interest_rate numeric default 0;

-- Incomes: Add salary_can_vary
alter table public.incomes add column if not exists salary_can_vary boolean default false;

-- Financings: Add down_payment and installment_type
alter table public.financings add column if not exists down_payment numeric default 0;
alter table public.financings add column if not exists installment_type text check (installment_type in ('fixed', 'variable')) default 'fixed';

-- 3. Performance Indexes
-- Group ID based indexes for RLS performance
create index if not exists idx_profiles_id on public.profiles(id);
create index if not exists idx_groups_owner_id on public.groups(owner_id);
create index if not exists idx_group_members_group_id on public.group_members(group_id);
create index if not exists idx_group_members_user_id on public.group_members(user_id);
create index if not exists idx_accounts_group_id on public.accounts(group_id);
create index if not exists idx_incomes_group_id on public.incomes(group_id);
create index if not exists idx_expenses_group_id on public.expenses(group_id);
create index if not exists idx_financings_group_id on public.financings(group_id);
create index if not exists idx_budgets_group_id on public.budgets(group_id);
create index if not exists idx_debt_plans_group_id on public.debt_plans(group_id);
create index if not exists idx_reminders_group_id on public.reminders(group_id);

-- Foreign Key indexes
create index if not exists idx_incomes_user_id on public.incomes(user_id);
create index if not exists idx_expenses_user_id on public.expenses(user_id);
create index if not exists idx_expenses_account_id on public.expenses(account_id);

-- 4. Logic & Security
-- Improve handle_new_user trigger
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

-- RLS for new tables
alter table public.budgets enable row level security;
alter table public.debt_plans enable row level security;
alter table public.reminders enable row level security;

create policy "Group members can view budgets" on public.budgets
  for select using (exists (select 1 from public.group_members where group_id = budgets.group_id and user_id = auth.uid()));
create policy "Group members can manage budgets" on public.budgets
  for all using (exists (select 1 from public.group_members where group_id = budgets.group_id and user_id = auth.uid()));

create policy "Group members can view debt_plans" on public.debt_plans
  for select using (exists (select 1 from public.group_members where group_id = debt_plans.group_id and user_id = auth.uid()));
create policy "Group members can manage debt_plans" on public.debt_plans
  for all using (exists (select 1 from public.group_members where group_id = debt_plans.group_id and user_id = auth.uid()));

create policy "Group members can view reminders" on public.reminders
  for select using (exists (select 1 from public.group_members where group_id = reminders.group_id and user_id = auth.uid()));
create policy "Users can manage own reminders" on public.reminders
  for all using (user_id = auth.uid());
