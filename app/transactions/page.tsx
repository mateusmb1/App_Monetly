'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFinance } from '@/context/FinanceContext';

export default function TransactionsPage() {
    const router = useRouter();
    const { incomes, expenses } = useFinance();

    // Combine and sort by date desc
    const allTransactions = [
        ...incomes.map(i => ({ ...i, type: 'income' })),
        ...expenses.map(e => ({ ...e, type: 'expense' }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="min-h-screen bg-retro-bg font-sans pb-24">
            <header className="flex items-center justify-between p-6 border-b-[3px] border-black bg-white sticky top-0 z-10 w-full max-w-md mx-auto left-0 right-0">
                <h1 className="text-2xl font-black uppercase tracking-wider">Extrato</h1>
                <button className="w-10 h-10 flex items-center justify-center border-[3px] border-black bg-neo-cyan shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
                    <i className="fa-solid fa-filter"></i>
                </button>
            </header>

            <main className="px-6 py-6 pb-24 max-w-md mx-auto flex flex-col gap-4">
                {allTransactions.length === 0 ? (
                    <div className="text-center py-10 opacity-50 font-bold">
                        Nenhuma transação encontrada.
                    </div>
                ) : (
                    allTransactions.map((t) => (
                        <article key={t.id} className="bg-white border-[3px] border-black p-4 shadow-brutal flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 flex items-center justify-center border-[3px] border-black rounded-full ${t.type === 'income' ? 'bg-neo-green' : 'bg-neo-orange'}`}>
                                    <i className={`fa-solid ${t.type === 'income' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg leading-none">{t.description}</span>
                                    <span className="text-xs font-bold text-gray-500 uppercase">{new Date(t.date).toLocaleDateString('pt-BR')}</span>
                                </div>
                            </div>
                            <span className={`font-black text-lg ${t.type === 'income' ? 'text-neo-green' : 'text-red-600'}`}>
                                {t.type === 'expense' ? '- ' : '+ '}
                                R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </article>
                    ))
                )}
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 w-full h-24 bg-white border-t-[3px] border-black flex justify-around items-center px-4 z-40 max-w-md mx-auto left-0 right-0">
                <Link href="/dashboard" className="flex flex-col items-center gap-1 p-2 text-black/40 hover:text-black transition-colors">
                    <span className="material-symbols-outlined font-black text-3xl">grid_view</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Início</span>
                </Link>
                <Link href="/transactions" className="flex flex-col items-center gap-1 p-2 text-black">
                    <span className="material-symbols-outlined font-black text-3xl">receipt_long</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Extrato</span>
                </Link>
                <div className="w-10"></div>
                <Link href="/planning" className="flex flex-col items-center gap-1 p-2 text-black/40 hover:text-black transition-colors">
                    <span className="material-symbols-outlined font-black text-3xl">pie_chart</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Budget</span>
                </Link>
                <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-black/40 hover:text-black transition-colors">
                    <span className="material-symbols-outlined font-black text-3xl">person</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Perfil</span>
                </Link>
            </nav>

            <Link href="/transactions/new-expense">
                <button className="fixed bottom-28 right-[calc(50%-2rem)] md:right-[calc(50%-2rem+200px)] size-16 rounded-full bg-neo-blue border-[3px] border-black shadow-brutal flex items-center justify-center text-white z-50 active:translate-y-[2px] active:shadow-none transition-all">
                    <span className="material-symbols-outlined text-4xl font-black">add</span>
                </button>
            </Link>
        </div>
    );
}
