# Supabase Implementation Plan

This document outlines the database schema, security policies, and integration steps to migrate the "Neo-Brutalist Finance App" to a Supabase backend.

## 1. Database Schema

We will create the following tables in the `public` schema. All tables will have RLS (Row Level Security) enabled.

### **Profiles (Users)**
Syncs with `auth.users`.
- `id` (uuid, PK, refs auth.users)
- `name` (text)
- `email` (text)
- `avatar_url` (text)
- `created_at` (timestamptz)

### **Groups**
- `id` (uuid, PK)
- `name` (text)
- `owner_id` (uuid, refs profiles.id)
- `currency` (text, default 'BRL')
- `created_at` (timestamptz)

### **Group Members**
- `id` (uuid, PK)
- `group_id` (uuid, refs groups.id)
- `user_id` (uuid, refs profiles.id)
- `role` (text: 'owner' | 'member')
- `joined_at` (timestamptz)

### **Accounts**
- `id` (uuid, PK)
- `group_id` (uuid, refs groups.id)
- `name` (text)
- `type` (text: 'cash' | 'bank' | 'credit_card')
- `balance` (numeric)
- `limit_total` (numeric, nullable)
- `closing_day` (integer, nullable)
- `due_day` (integer, nullable)
- `total_debt` (numeric, nullable)

### **Incomes**
- `id` (uuid, PK)
- `group_id` (uuid, refs groups.id)
- `user_id` (uuid, refs profiles.id)
- `amount` (numeric)
- `date` (date)
- `description` (text)
- `type` (text: 'fixed' | 'variable')
- `source` (text)
- `recurrence` (text)
- `is_salary` (boolean)
- `account_id` (uuid, refs accounts.id, nullable)

### **Expenses**
- `id` (uuid, PK)
- `group_id` (uuid, refs groups.id)
- `user_id` (uuid, refs profiles.id)
- `amount` (numeric)
- `date` (date)
- `description` (text)
- `category` (text)
- `recurrence` (text)
- `is_fixed` (boolean)
- `is_variable_recurrent` (boolean)
- `is_unexpected` (boolean)
- `payment_method` (text)
- `account_id` (uuid, refs accounts.id, nullable)
- `is_paid` (boolean)

### **Financings**
- `id` (uuid, PK)
- `group_id` (uuid, refs groups.id)
- `user_id` (uuid, refs profiles.id)
- `type` (text)
- `name` (text)
- `principal_amount` (numeric)
- `total_months` (integer)
- `start_date` (date)
- `installment_amount` (numeric)
- `paid_installments_count` (integer)

## 2. Security (RLS)

- **Profiles**: Users can read/update their own profile.
- **Groups**: 
    - Read/Update: Members of the group.
    - Insert: Authenticated users.
- **Other Tables**:
    - Users can perform CRUD operations if they are a member of the linked `group_id`.

## 3. Integration Plan

### Dependencies
- Install `@supabase/supabase-js`.

### Configuration
- Create `.env.local` with:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Helper `lib/supabase.ts` to initialize the client.

### Data Migration (Seed)
- Create a SQL script `seed.sql` to verify tables are created and perform initial setup if needed.

## 4. Execution Steps (Orchestration Phase 2)

1.  **Backend Agent**: Create `lib/supabase.ts` and `.env.local`. 
    *   *Note*: User provided a token [REDACTED] which functions as a service role or management token. We will need the Project URL and Anon Key for the frontend. **Crucial**: We need to ask the user for the `SUPABASE_URL` and `ANON_KEY` if they are not in the environment yet, OR I can try to use the Token to fetch them if I have the CLI tool (I don't). **Workaround**: I will create the SQL migration file and ask the user to run it via their dashboard SQL editor or provide the credentials.
    *   *Correction*: The user provided a "project ref". We can construct the URL: `https://ridltynxeodzhznaczrg.supabase.co`. The Anon Key is still needed unless I use the Service Token (unsafe for client side). I will assume server-side usage or ask for Anon Key.
2.  **Database Agent**: Generate `supabase/schema.sql` with all `CREATE TABLE` statements.
3.  **Frontend Agent**: Update `context/FinanceContext.tsx` to fetch from Supabase instead of mock data (this is a big step, might be done in stages).

## 5. Verification
- Run a script that attempts to connect and list tables.
