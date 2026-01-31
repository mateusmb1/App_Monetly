# Backend Audit Report - Supabase Project

This report summarizes the findings of the multi-agent audit performed on the database schema, security policies, and logic.

## 🎼 Orchestration Report

### Task
Audit tables, functions, and overall backend structure for completeness and security.

### Agents Invoked
| # | Agent | Focus Area | Status |
|---|-------|------------|--------|
| 1 | `backend-specialist` | Logic & Functions | ✅ Verified |
| 2 | `database-architect` | Schema & Indexing | ✅ Verified |
| 3 | `security-auditor` | RLS & Auth | ✅ Verified |

---

## 🔍 Key Findings

### 1. Missing Entities (Gap Analysis)
Compared to the requirements in `orientacao.md`:
- [ ] **`public.budgets`**: Table is missing. Required for planning monthly category limits.
- [ ] **`public.debt_plans`**: Table is missing. Required for planning debt payoffs.
- [ ] **`public.reminders`**: (Optional but recommended) Table missing to track daily check-ins and monthly salary confirmations.

### 2. Schema Issues (`database-architect`)
- **Missing Fields**:
    - `public.accounts`: Missing `interest_rate`.
    - `public.incomes`: Missing `salary_can_vary` (crucial for projections).
    - `public.financings`: Missing `down_payment` and `installment_type` (fixed/variable).
- **Indexing**: 
    - Critical missing indexes on `group_id` for all tables. Queries filtering by group (used in every RLS policy) will slow down as data grows.
    - Missing indexes on `user_id` and `account_id` foreign keys.

### 3. Logic & Functions (`backend-specialist`)
- **`handle_new_user()`**:
    - Uses `new.raw_user_meta_data->>'name'`. This is brittle. If the provider is Google or GitHub, the field might be `full_name`.
    - *Suggestion*: Use `COALESCE(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', 'User')`.

### 4. Security Audit (`security-auditor`)
- **RLS Policies**:
    - Generally solid using the `group_members` check.
    - **Vulnerability**: `Users can view own membership` in `group_members` is redundant because `Members can view group members` already covers it for current group members. 
    - **Optimization**: The `exists` subqueries in RLS are correct for security but should be backed by indexes (see Schema Issues).

---

## 🛠 Recommended Actions

### Step 1: Create Missing Tables
Implement `budgets` and `debt_plans` to satisfy business rules.

### Step 2: Patch Existing Tables
Add missing metadata fields and performance indexes.

### Step 3: Robust User Creation
Update the trigger function to handle different metadata formats.

---

## 📝 SQL Patch Suggestion
A separate `audit_fix.sql` can be generated to apply these changes.
