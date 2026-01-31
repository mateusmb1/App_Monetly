# Monetly Implementation Plan - Neo-Brutalist Finance PWA

##  Goal
Replace the existing application with **Monetly**, a new **Personal & Family Finance PWA** featuring a "Neo-Brutalist" design. The app will focus on daily usage, projections, and shared family management.

## 1. Architecture & Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (configured for Neo-Brutalist theme: brutal borders, shadows, no-radius)
- **State Management:** React Context (`FinanceContext`) for global state (User, Group, Transactions, Projections).
- **Iconography:** FontAwesome & Material Symbols (as used in the provided templates).
- **Deployment:** PWA (Progressive Web App) capable.

## 2. Entity Model (Frontend Types)
Based on `orientacao.md`, the following entities will be defined in `types/index.ts`:
- **User**: `id`, `name`, `email`, `avatar`
- **Group**: `id`, `name`, `owner_id`, `members`
- **GroupMember**: `user_id`, `role`, `stats` (income/expense share)
- **Account**: `id`, `name`, `type` (cash, bank, credit_card), `balance`, `credit_limit`, `closing_day`, `due_day`
- **Transaction (Income/Expense)**: `id`, `amount`, `date`, `description`, `category`, `type` (fixed/variable), `account_id`, `is_paid`
- **Financing**: `id`, `name`, `total_amount`, `remaining_amount`, `installments_paid`, `total_installments`, `monthly_payment`
- **CardStrategy**: `card_id`, `strategy_type` (full, min, fixed), `fixed_amount`

## 3. Component & Route Mapping
We will map the screens from `codigosTelas.txt` to the Next.js App Router structure.

### Public/Auth
- `/login` -> `Neo-Brutalist Login Screen`
- `/onboarding` -> `Neo-Brutalist Onboarding`

### Protected (Main Layout)
- `/dashboard` (Home) -> `Dashboard Financeiro Mensal`
  - **Features**: Monthly balance, Category breakdown, Due dates.
- `/planning` -> `Planejamento Neo-brutalista`
  - **Features**: 3-month forecast view (Jan/Feb/Mar simulation).
- `/transactions/new-expense` -> `Nova Despesa`
- `/transactions/new-income` -> `Lançamento de Receita`
- `/suggestions` -> `Sugestões Financeiras` (Import transactions)
- `/cards` -> `Meus Cartões`
- `/cards/[id]` -> `Cartão Nubank` (Details + Strategy)
- `/financing/[id]` -> `Detalhes do Financiamento`
- `/group` -> `Grupo Familiar`
- `/profile` -> `Perfil do Usuário Neo-brutalista`
- `/settings/security` -> `Segurança e Biometria`
- `/settings/reminders` -> `Lembretes`

### Modals
- `SalaryConfirmationModal` -> `Confirmacao de Salario` (Triggered on monthly check).
- `DailyCheckinModal` -> Used in Dashboard (or separate route if complex).

## 4. Execution Plan (Phase 2)

### Step 1: Foundation Setup
- [ ] Clean existing `app` directory (moving old files to `_backup` if necessary).
- [ ] Update `tailwind.config.ts` with Neo-Brutalist colors (`neo-yellow`, `neo-purple`, `neo-green`, etc.) and shadow utilities.
- [ ] Install dependencies (FontAwesome, Google Fonts setup).

### Step 2: Core Context & Types
- [ ] Create `types/index.ts`.
- [ ] Create `context/FinanceContext.tsx` with mock data for Users, Groups, Accounts, and Transactions to support the UI immediately.

### Step 3: Implement Screens (Parallel Execution)
**Batch A: Core Flows**
-   `app/login/page.tsx`
-   `app/onboarding/page.tsx`
-   `app/dashboard/page.tsx` (Main Hub)

**Batch B: Transaction Management**
-   `app/transactions/new-expense/page.tsx`
-   `app/transactions/new-income/page.tsx`
-   `app/suggestions/page.tsx`

**Batch C: Financial Products**
-   `app/cards/page.tsx` & `app/cards/[id]/page.tsx`
-   `app/financing/[id]/page.tsx`
-   `app/planning/page.tsx`

**Batch D: Settings & Group**
-   `app/group/page.tsx`
-   `app/profile/page.tsx`
-   `app/settings/security/page.tsx`
-   `app/settings/reminders/page.tsx`

### Step 4: Logic Integration
- [ ] Connect `SalaryConfirmationModal` to Dashboard logic (check first of month).
- [ ] Connect `DailyCheckinModal` logic.
- [ ] Ensure "Projections" in Planning reads from shared Context data.

### Step 5: Verification
- [ ] Verify all routes navigation.
- [ ] Verify responsiveness (Mobile-first design).
- [ ] Lint & Build check.

## 5. Verification Plan
- **Manual**: Navigate through the "User Flow" (Login -> Dashboard -> Add Expense -> Check Planning).
- **Automated**: Run `npm run build` to ensure type safety.
