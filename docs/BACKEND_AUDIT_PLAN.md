# Backend Audit Plan - Supabase Project `ridltynxeodzhznaczrg`

This plan outlines the orchestration of a multi-agent audit to verify the integrity, security, and completeness of the backend implementation.

## 1. Audit Objectives
- **Schema Validation**: Ensure tables match the requirements in `orientacao.md` and `schema.sql`.
- **Function/Trigger Audit**: Verify that triggers (like user creation) and functions are logically sound and error-resistant.
- **Security Audit (RLS)**: Confirm that Row Level Security policies correctly protect data within family groups.
- **Integrity Check**: Verify foreign key constraints and cascade behaviors.

## 2. Orchestrated Agents
| Agent | Role |
|-------|------|
| `project-planner` | Coordinator and strategy definition. |
| `explorer-agent` | Connects via MCP to verify the live database state. |
| `backend-specialist` | Audits PL/pgSQL logic, functions, and RLS. |
| `database-architect` | Reviews indexing, naming conventions, and data modeling. |

## 3. Audit Steps (Phase 2)
### Step 1: Live Schema Extraction (`explorer-agent`)
- Use Supabase MCP to list all tables and columns in the active project.
- List all triggers and functions.
- Compare live state with `supabase/schema.sql`.

### Step 2: Logic & Security Review (`backend-specialist`)
- Evaluate `handle_new_user()` function for robustness.
- Audit RLS policies:
    - Check if members of a group can actually view/manage only their group's data.
    - Verify `profiles` security.
- Check for missing validation or constraints (e.g., negative amounts in incomes/expenses).

### Step 3: Performance & Structure Review (`database-architect`)
- Check for missing indexes on frequently queried columns (e.g., `group_id`, `user_id` in `expenses`).
- Review table structures for normalization and scalability.

## 4. Deliverables
- Detailed Audit Report (`docs/AUDIT_REPORT.md`).
- Recommended SQL patches for identified issues.
