'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function SuggestionsPage() {
    const router = useRouter();

    const suggestions = [
        { id: 1, title: 'Uber * Trip', date: '14:30', amount: 24.90, icon: 'fa-car', color: 'bg-neo-yellow', bank: 'Nubank' },
        { id: 2, title: 'iFood * Pedido', date: '12:15', amount: 45.50, icon: 'fa-utensils', color: 'bg-neo-red', bank: 'Itaú' },
        { id: 3, title: 'Netflix Com', date: 'Ontem', amount: 55.90, icon: 'fa-film', color: 'bg-neo-yellow', bank: 'Nubank' },
    ];

    return (
        <div className="min-h-screen bg-retro-bg font-sans pb-10">
            <header className="flex items-center justify-between mb-8 relative p-6">
                <button aria-label="Voltar" onClick={() => router.back()} className="p-1 focus:outline-none">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
                <h1 className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">Sugestões</h1>
                <div className="w-8"></div>
            </header>

            <main className="px-6 pb-10 max-w-md mx-auto">
                <section className="mb-8">
                    <h2 className="text-3xl font-extrabold leading-tight mb-3">Sugestões Automáticas</h2>
                    <p className="text-lg font-semibold leading-snug">Identificamos 3 novos gastos nas notificações do seu banco. Confirme para organizar suas finanças.</p>
                </section>

                <div className="space-y-8">
                    <div data-purpose="group-today">
                        <div className="flex items-center mb-3">
                            <div className="border-[2px] border-black px-2 py-1 bg-white z-10">
                                <span className="block text-lg font-black uppercase tracking-wide">HOJE</span>
                            </div>
                            <div className="h-[2px] bg-black flex-grow -ml-[2px]"></div>
                        </div>

                        {suggestions.slice(0, 2).map((item) => (
                            <article key={item.id} className="bg-white border-[2px] border-black p-4 shadow-none mb-5">
                                <div className="flex justify-between items-start mb-5">
                                    <div className="flex gap-3">
                                        <div className="w-12 h-12 flex-shrink-0 relative">
                                            <div className={`w-full h-full rounded-full flex items-center justify-center border-2 border-black ${item.color}`}>
                                                <i className={`fa-solid ${item.icon} text-lg`}></i>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold leading-none mb-1">{item.title}</span>
                                            <div className="flex items-center gap-1 text-sm font-bold text-gray-800">
                                                <span>{item.bank} • {item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold whitespace-nowrap">- R$ {item.amount.toFixed(2).replace('.', ',')}</div>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-gray-200 border-[2px] border-black py-3 px-4 font-bold text-base hover:bg-gray-300 transition-colors">Ignorar</button>
                                    <button className="flex-1 bg-neo-green border-[2px] border-black py-3 px-4 font-bold text-base hover:opacity-90 transition-opacity">Adicionar</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
