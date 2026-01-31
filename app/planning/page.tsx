'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PlanningPage() {
    const router = useRouter();

    // Mock data for 3 months
    const months = [
        { name: 'JAN', year: '2024', status: 'passado', balance: 450, income: 5000, expense: 4550 },
        { name: 'FEV', year: '2024', status: 'atual', balance: 1250, income: 5200, expense: 3950 },
        { name: 'MAR', year: '2024', status: 'futuro', balance: -300, income: 5000, expense: 5300 },
    ];

    return (
        <div className="min-h-screen bg-retro-bg flex flex-col font-sans pb-24">
            {/* Header */}
            <header className="flex items-center justify-between p-6 border-b-[3px] border-black bg-white sticky top-0 z-20">
                <h1 className="text-2xl font-black uppercase tracking-wider">Planejamento</h1>
                <div className="flex gap-2">
                    <button className="px-3 py-1 font-bold border-[2px] border-black bg-neo-yellow text-xs shadow-brutal-sm uppercase">2024</button>
                    <button className="px-3 py-1 font-bold border-[2px] border-black bg-white text-xs shadow-brutal-sm uppercase">Filtros</button>
                </div>
            </header>

            {/* Horizontal Scroll Container for Months */}
            <main className="flex-1 overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory pt-6 pb-6 px-4 gap-4 no-scrollbar">

                {months.map((month, index) => (
                    <article
                        key={index}
                        className={`flex-none w-[85vw] max-w-sm snap-center flex flex-col border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white relative ${month.status === 'atual' ? 'ring-4 ring-neo-purple ring-opacity-50' : ''}`}
                    >
                        {/* Month Header */}
                        <div className={`p-4 border-b-[3px] border-black flex justify-between items-center ${month.status === 'atual' ? 'bg-neo-purple text-white' : 'bg-white text-black'}`}>
                            <div className="flex flex-col">
                                <span className="text-3xl font-black uppercase leading-none">{month.name}</span>
                                <span className="text-xs font-bold tracking-widest">{month.year}</span>
                            </div>

                            <div className={`px-2 py-1 border-[2px] border-black text-xs font-black uppercase ${month.status === 'atual' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}`}>
                                {month.status === 'atual' ? 'Mês Atual' : month.status === 'passado' ? 'Fechado' : 'Simulado'}
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="p-4 bg-neo-cream border-b-[3px] border-black">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider">Saldo Projetado</span>
                                <span className={`text-2xl font-black ${month.balance >= 0 ? 'text-neo-green' : 'text-red-600'}`}>
                                    {month.balance >= 0 ? '+' : ''} R$ {Math.abs(month.balance)}
                                </span>
                            </div>
                            {/* Visual Bar */}
                            <div className="w-full h-4 border-[2px] border-black bg-white relative">
                                <div
                                    className={`h-full border-r-[2px] border-black ${month.balance >= 0 ? 'bg-neo-green' : 'bg-red-500'}`}
                                    style={{ width: '80%' }}
                                ></div>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                            {/* Income Row */}
                            <div className="flex justify-between items-center p-3 border-[2px] border-black shadow-brutal-sm bg-neo-lime">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-arrow-up text-black font-bold"></i>
                                    <span className="font-bold text-sm uppercase">Entradas</span>
                                </div>
                                <span className="font-black">R$ {month.income}</span>
                            </div>

                            {/* Expense Row */}
                            <div className="flex justify-between items-center p-3 border-[2px] border-black shadow-brutal-sm bg-neo-orange">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-arrow-down text-black font-bold"></i>
                                    <span className="font-bold text-sm uppercase">Saídas</span>
                                </div>
                                <span className="font-black text-black">R$ {month.expense}</span>
                            </div>

                            {/* Edit Button */}
                            <button className="w-full py-3 mt-4 border-[2px] border-black border-dashed font-bold hover:bg-black hover:text-white transition-colors uppercase text-xs">
                                Ver Detalhes do Mês
                            </button>
                        </div>
                    </article>
                ))}

                {/* Add Month Placeholder */}
                <div className="flex-none w-16 snap-center flex flex-col justify-center items-center">
                    <button className="w-12 h-12 bg-white border-[3px] border-black shadow-brutal flex items-center justify-center hover:scale-110 transition-transform">
                        <i className="fa-solid fa-plus text-xl"></i>
                    </button>
                </div>

            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 w-full h-24 bg-white border-t-[3px] border-black flex justify-around items-center px-4 z-40 max-w-md mx-auto left-0 right-0">
                <Link href="/dashboard" className="flex flex-col items-center gap-1 p-2 text-black/40 hover:text-black transition-colors">
                    <span className="material-symbols-outlined font-black text-3xl">grid_view</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Início</span>
                </Link>
                <Link href="/transactions" className="flex flex-col items-center gap-1 p-2 text-black/40 hover:text-black transition-colors">
                    <span className="material-symbols-outlined font-black text-3xl">receipt_long</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Extrato</span>
                </Link>
                <div className="w-10"></div> {/* Spacer for FAB */}
                <Link href="/planning" className="flex flex-col items-center gap-1 p-2 text-black">
                    <span className="material-symbols-outlined font-black text-3xl">pie_chart</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Budget</span>
                </Link>
                <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-black/40 hover:text-black transition-colors">
                    <span className="material-symbols-outlined font-black text-3xl">person</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Perfil</span>
                </Link>
            </nav>

            {/* Floating Action Button z-index fix */}
            <Link href="/transactions/new-expense">
                <button className="fixed bottom-28 right-[calc(50%-2rem)] md:right-[calc(50%-2rem+200px)] size-16 rounded-full bg-neo-blue border-[3px] border-black shadow-brutal flex items-center justify-center text-white z-50 active:translate-y-[2px] active:shadow-none transition-all hidden">
                    {/* Hidden on planning page generally or repurposed */}
                    <span className="material-symbols-outlined text-4xl font-black">add</span>
                </button>
            </Link>
        </div>
    );
}
