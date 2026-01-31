# Database Implementation Plan - Audit Fixes

This plan details the implementation of missing tables, schema patches, and security optimizations identified in the Backend Audit.

## Proposed Changes

### Database Schema
#### [NEW] [audit_fix.sql](file:///c:/Users/Eu/Downloads/jules_session_3658926119558465872/supabase/audit_fix.sql)
I will create a migration script with the following sections:

1. **New Tables**:
    - `public.budgets`: For monthly category limits.
    - `public.debt_plans`: For payoff strategies.
    - `public.reminders`: For check-ins and notifications.

2. **Schema Patches**:
    - Add `interest_rate` to `accounts`.
    - Add `salary_can_vary` to `incomes`.
    - Add `down_payment` and `installment_type` to `financings`.

3. **Performance Optimization**:
    - Add indexes on `group_id` for all relevant tables.
    - Add indexes on all foreign key columns.

4. **Security & Logic**:
    - Update `handle_new_user()` to handle different meta-data formats.
    - Clean up redundant RLS policies.

#### [MODIFY] [schema.sql](file:///c:/Users/Eu/Downloads/jules_session_3658926119558465872/supabase/schema.sql)
- Integrate these changes into the main schema file to ensure new environments start with the corrected version.

## Verification Plan
### Automated Tests
- Run the SQL script in a test environment (Supabase Local or similar).
- Verify table existence and column types.
- Check if the trigger function executes correctly upon user insertion.

### Manual Verification
- Verify that RLS policies still allow group members to see their data.
- Confirm that the new fields are available in the Supabase Dashboard (or via MCP if available).
