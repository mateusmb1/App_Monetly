export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type GroupRole = 'owner' | 'member';

export type GroupMember = {
  user_id: string;
  role: GroupRole;
  joined_at: string;
};

export type Group = {
  id: string;
  name: string;
  owner_id: string;
  members: GroupMember[];
  currency: string;
};

export type AccountType = 'cash' | 'bank' | 'credit_card';

export type Account = {
  id: string;
  group_id: string;
  name: string;
  type: AccountType;
  balance: number;
  // Credit Card specific
  limit_total?: number;
  closing_day?: number;
  due_day?: number;
  interest_rate?: number;
  total_debt?: number;
};

export type TransactionType = 'fixed' | 'variable';
export type Recurrence = 'none' | 'monthly' | 'weekly';

export type Income = {
  id: string;
  group_id: string;
  user_id: string;
  amount: number;
  date: string; // ISO date
  description: string;
  type: TransactionType;
  source: string;
  recurrence: Recurrence;
  is_salary: boolean;
  salary_can_vary: boolean;
  account_id: string;
};

export type Expense = {
  id: string;
  group_id: string;
  user_id: string;
  amount: number;
  date: string; // ISO date
  description: string;
  category: string;
  recurrence: Recurrence;
  is_fixed: boolean;
  is_variable_recurrent: boolean;
  is_unexpected: boolean;
  payment_method: AccountType; // or specifics like 'credit_card'
  account_id: string;
  is_paid: boolean;
};

export type FinancingType = 'car' | 'motorcycle' | 'property' | 'other';
export type InstallmentType = 'fixed' | 'variable';

export type Financing = {
  id: string;
  group_id: string;
  user_id: string;
  type: FinancingType;
  name: string;
  principal_amount: number;
  down_payment?: number;
  total_months: number;
  start_date: string;
  installment_amount: number;
  installment_type: InstallmentType;
  paid_installments_count: number;
};

export type Budget = {
  id: string;
  group_id: string;
  month: number;
  year: number;
  category: string;
  planned_amount: number;
};

// Summary Types for Dashboard
export type MonthlySummary = {
  total_income: number;
  total_expense: number;
  total_debt_payment: number;
  balance_projected: number;
  pots: {
    essentials: number;
    leisure: number;
    unexpected: number;
    debts: number;
  };
};
