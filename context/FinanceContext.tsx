'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    User, Group, Account, Income, Expense, Financing, MonthlySummary
} from '@/types';
import { supabase } from '@/lib/supabase';

// Mock Data (Fallback)
const MOCK_USER: User = {
    id: 'u1',
    name: 'Rodrigo Silva (Mock)',
    email: 'rodrigo.silva@email.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfx8sklhFxIreq1VIOX8gFMhLko4ZEHoPIeiGc7f7JCTn0iyX2BZRTnmLtCeiH1kocpPRanCEeIKs9p5VhH6W1z6mevXO0lDqy2p7N0czVJs2cYIlGx2jCQHmlw1ZLmlooYTjxnj-1W6d-NmpOXogzGUATQEsz1vdCzCOvuC5lfKFScbioT6duzu04KYRPAmcZtCOWaOdXSa6SurqhyEmi3SpEhIG6lV0q2io6Tw_28UROGkusRQxyUYkEfV046tDbIfNDAPawc7U'
};

const MOCK_GROUP: Group = {
    id: 'g1',
    name: 'Família Silva',
    owner_id: 'u1',
    members: [
        { user_id: 'u1', role: 'owner', joined_at: '2024-01-01' }
    ],
    currency: 'BRL'
};

const MOCK_ACCOUNTS: Account[] = [
    { id: 'a1', group_id: 'g1', name: 'Nubank', type: 'bank', balance: 3500.00 },
    {
        id: 'a2', group_id: 'g1', name: 'Nubank Crédito', type: 'credit_card', balance: 0,
        limit_total: 8000, closing_day: 5, due_day: 12, total_debt: 1250.00
    },
    { id: 'a3', group_id: 'g1', name: 'Carteira', type: 'cash', balance: 150.00 }
];

const MOCK_INCOMES: Income[] = [
    {
        id: 'i1', group_id: 'g1', user_id: 'u1', amount: 5000, date: '2024-09-05',
        description: 'Salário Mensal', type: 'fixed', source: 'Employment', recurrence: 'monthly',
        is_salary: true, salary_can_vary: false, account_id: 'a1'
    }
];

const MOCK_EXPENSES: Expense[] = [
    {
        id: 'e1', group_id: 'g1', user_id: 'u1', amount: 2500, date: '2024-09-10',
        description: 'Aluguel', category: 'Essenciais', recurrence: 'monthly',
        is_fixed: true, is_variable_recurrent: false, is_unexpected: false,
        payment_method: 'bank', account_id: 'a1', is_paid: false
    },
    {
        id: 'e2', group_id: 'g1', user_id: 'u1', amount: 55.90, date: '2024-09-15',
        description: 'Netflix', category: 'Lazer', recurrence: 'monthly',
        is_fixed: true, is_variable_recurrent: false, is_unexpected: false,
        payment_method: 'credit_card', account_id: 'a2', is_paid: false
    }
];

type FinanceContextType = {
    user: User | null;
    group: Group | null;
    accounts: Account[];
    incomes: Income[];
    expenses: Expense[];
    financings: Financing[];
    isLoading: boolean;
    addExpense: (expense: Omit<Expense, 'id' | 'group_id' | 'user_id'>) => Promise<void>;
    addIncome: (income: Omit<Income, 'id' | 'group_id' | 'user_id'>) => Promise<void>;
    getMonthlySummary: (month: number, year: number) => MonthlySummary;
};

export const FinanceContext = createContext<FinanceContextType>({} as FinanceContextType);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [group, setGroup] = useState<Group | null>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [financings, setFinancings] = useState<Financing[]>([]); // TODO: Add mock financings
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                // Load Real Data
                await loadUserData(session.user.id);
            } else {
                // Load Mock Data
                console.log('No session, loading mocks');
                setUser(MOCK_USER);
                setGroup(MOCK_GROUP);
                setAccounts(MOCK_ACCOUNTS);
                setIncomes(MOCK_INCOMES);
                setExpenses(MOCK_EXPENSES);
                // In a real app, we might redirect to login, but here we fallback
                setIsLoading(false);
            }
        };

        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                await loadUserData(session.user.id);
            } else {
                setUser(null);
                setGroup(null);
                setAccounts([]);
                setIncomes([]);
                setExpenses([]);
                setIsLoading(false);
            }
        });

        fetchSession();

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const loadUserData = async (userId: string) => {
        try {
            setIsLoading(true);
            // 1. Fetch Profile
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
            if (profile) {
                setUser({ id: profile.id, name: profile.name, email: profile.email, avatar: profile.avatar_url });
            }

            // 2. Fetch Group (Assumes user has one group for now)
            // Join group_members to find group_id
            const { data: member } = await supabase.from('group_members').select('group_id').eq('user_id', userId).single();

            if (member) {
                const { data: groupData } = await supabase.from('groups').select('*').eq('id', member.group_id).single();
                if (groupData) {
                    setGroup(groupData);

                    // 3. Fetch Data for this Group
                    const { data: accs } = await supabase.from('accounts').select('*').eq('group_id', groupData.id);
                    if (accs) setAccounts(accs);

                    const { data: incs } = await supabase.from('incomes').select('*').eq('group_id', groupData.id);
                    if (incs) setIncomes(incs);

                    const { data: exps } = await supabase.from('expenses').select('*').eq('group_id', groupData.id);
                    if (exps) setExpenses(exps);
                }
            } else {
                // If no group, maybe Create Default Group? (Out of scope for this step, but good idea)
                console.log('User has no group');
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addExpense = async (newExpense: Omit<Expense, 'id' | 'group_id' | 'user_id'>) => {
        if (!user || !group) {
            console.warn('Cannot add expense: User or Group missing (using mock fallback logic?)');
            // Simplified fallback for prototype
            return;
        }

        const expensePayload = {
            ...newExpense,
            group_id: group.id,
            user_id: user.id,
        };

        const { data, error } = await supabase.from('expenses').insert(expensePayload).select().single();

        if (error) {
            console.error('Error adding expense:', error);
            alert('Erro ao salvar despesa');
            return;
        }

        if (data) {
            setExpenses(prev => [...prev, data]);

            // Update account balance if needed (logic similar to before but via DB triggers is better. 
            // For now, optimistic update or refetch is fine. We will stick to local state update for speed)
            if (newExpense.account_id) {
                // Ideally, we decrement the balance in DB too. 
                // For valid prototype:
                // await supabase.rpc('decrement_balance', { row_id: newExpense.account_id, amount: newExpense.amount }); 
                // (Note: need to create this RPC or just update directly)
                // Direct update:
                const acc = accounts.find(a => a.id === newExpense.account_id);
                if (acc) {
                    const newBalance = acc.balance - newExpense.amount;
                    await supabase.from('accounts').update({ balance: newBalance }).eq('id', acc.id);
                    setAccounts(prev => prev.map(a => a.id === acc.id ? { ...a, balance: newBalance } : a));
                }
            }
        }
    };

    const addIncome = async (newIncome: Omit<Income, 'id' | 'group_id' | 'user_id'>) => {
        if (!user || !group) return;

        const incomePayload = {
            ...newIncome,
            group_id: group.id,
            user_id: user.id
        };

        const { data, error } = await supabase.from('incomes').insert(incomePayload).select().single();

        if (error) {
            console.error('Error adding income', error);
            return;
        }

        if (data) {
            setIncomes(prev => [...prev, data]);
            if (newIncome.account_id) {
                const acc = accounts.find(a => a.id === newIncome.account_id);
                if (acc) {
                    const newBalance = acc.balance + newIncome.amount;
                    await supabase.from('accounts').update({ balance: newBalance }).eq('id', acc.id);
                    setAccounts(prev => prev.map(a => a.id === acc.id ? { ...a, balance: newBalance } : a));
                }
            }
        }
    };

    const getMonthlySummary = (month: number, year: number): MonthlySummary => {
        // Filter for the specific month/year logic would go here. 
        // For now, returning calculations based on all mock data for simplicity of the prototype
        // In a real app, date-fns or dayjs would be used to filter by range.

        const total_income = incomes.reduce((acc, curr) => acc + curr.amount, 0);
        const total_expense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

        // Hardcoded logic for projection based on the Plan requirements
        return {
            total_income,
            total_expense,
            total_debt_payment: 0, // from mock account debt
            balance_projected: total_income - total_expense,
            pots: {
                essentials: 0, // Rent
                leisure: 0, // Netflix
                unexpected: 0,
                debts: 0
            }
        };
    };

    return (
        <FinanceContext.Provider value={{
            user,
            group,
            accounts,
            incomes,
            expenses,
            financings,
            isLoading,
            addExpense,
            addIncome,
            getMonthlySummary
        }}>
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => useContext(FinanceContext);
