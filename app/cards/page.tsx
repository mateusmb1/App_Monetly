'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFinance } from '@/context/FinanceContext';

export default function CardsPage() {
    const router = useRouter();
    const { accounts } = useFinance();
    const creditCards = accounts.filter(acc => acc.type === 'credit_card');

    return (
        <div className="min-h-screen bg-retro-bg font-sans pb-20">
            {/* Header */}
            <header className="flex items-center justify-between p-6 border-b-[3px] border-black bg-white sticky top-0 z-10">
                <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center border-[3px] border-black rounded-full shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px] bg-neo-yellow">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="text-2xl font-black uppercase tracking-wider">Meus Cartões</h1>
                <div className="w-10"></div>
            </header>

            <main className="p-6 flex flex-col gap-6 max-w-md mx-auto">
                {/* Total Bill Card */}
                <section className="bg-neo-purple border-[3px] border-black p-6 shadow-brutal text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="font-bold text-sm uppercase tracking-widest mb-1">Fatura Total</h2>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold">R$</span>
                            <span className="text-4xl font-black">
                                {creditCards.reduce((acc, curr) => acc + (curr.total_debt || 0), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        <p className="text-xs font-medium mt-2 opacity-90">Vencimentos variados</p>
                    </div>
                    {/* Decorative Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
                </section>

                {/* Cards List */}
                <div className="flex flex-col gap-4">
                    {creditCards.map((card) => (
                        <Link key={card.id} href={`/cards/${card.id}`}>
                            <article className="bg-white border-[3px] border-black p-4 shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                                        {card.name}
                                    </div>
                                    <div className="w-8 h-5 bg-red-500 rounded-sm opacity-80"></div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Limite Disponível</p>
                                        <p className="text-xl font-black text-neo-green">
                                            R$ {((card.limit_total || 0) - (card.total_debt || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Fatura Atual</p>
                                        <p className="text-xl font-black text-black">
                                            R$ {(card.total_debt || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>
                                {/* Progress Bar */}
                                <div className="mt-4 w-full h-3 border-2 border-black bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-neo-purple"
                                        style={{ width: `${((card.total_debt || 0) / (card.limit_total || 1)) * 100}%` }}
                                    ></div>
                                </div>
                            </article>
                        </Link>
                    ))}

                    {/* Add New Card Button */}
                    <button className="w-full border-[3px] border-black border-dashed p-4 flex items-center justify-center gap-2 font-bold hover:bg-white transition-colors">
                        <i className="fa-solid fa-plus"></i>
                        <span>ADICIONAR NOVO CARTÃO</span>
                    </button>
                </div>
            </main>
        </div>
    );
}
