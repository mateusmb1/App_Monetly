'use client';

import React from 'react';
import Link from 'next/link';
import { useFinance } from '@/context/FinanceContext';

export default function DashboardPage() {
   const { group, getMonthlySummary } = useFinance();

   // For demo purposes, using current date
   const now = new Date();
   const summary = getMonthlySummary(now.getMonth() + 1, now.getFullYear());

   const balanceFormatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
   });

   return (
      <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-neo-bg overflow-hidden pb-24 text-black">
         {/* Header */}
         <header className="flex items-center justify-between p-6 pt-10 sticky top-0 bg-neo-bg z-20">
            <div className="flex flex-col">
               <div className="flex items-center gap-1">
                  <span className="text-sm uppercase tracking-tighter cursor-pointer hover:underline">
                     {group?.name || 'Carregando...'}
                  </span>
                  <span className="material-symbols-outlined text-black font-black">expand_more</span>
               </div>
               <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">
                     {now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </h2>
                  <span className="material-symbols-outlined font-black">calendar_month</span>
               </div>
            </div>
            <button className="p-2 border-[3px] border-black shadow-brutal bg-white rounded-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
               <span className="material-symbols-outlined font-black">notifications</span>
            </button>
         </header>

         {/* Main Content */}
         <main className="flex-1 flex flex-col gap-6 px-5 overflow-y-auto no-scrollbar">
            {/* Balance Card */}
            <div className="w-full bg-neo-yellow border-[3px] border-black shadow-brutal-lg p-6 flex flex-col gap-4">
               <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                     <p className="uppercase text-xs tracking-widest mb-1">Saldo Projetado</p>
                     <h1 className="text-5xl font-black tracking-tighter">
                        {balanceFormatter.format(summary.balance_projected)}
                     </h1>
                  </div>
                  <span className="px-3 py-1 border-[3px] border-black bg-neo-lime text-black text-xs font-black uppercase">
                     Confortável
                  </span>
               </div>
               {/* Progress Bar */}
               <div className="w-full bg-black h-8 border-[3px] border-black overflow-hidden p-1">
                  <div className="bg-white h-full" style={{ width: '75%' }}></div>
               </div>
               <div className="flex justify-between text-sm uppercase tracking-tighter">
                  <span>Hoje: R$ 3.100</span>
                  <span>Meta: R$ 5.000</span>
               </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
               <div className="flex flex-col p-3 bg-neo-lime border-[3px] border-black shadow-brutal">
                  <p className="text-[10px] uppercase mb-1">Receitas</p>
                  <p className="text-lg font-black leading-none">{balanceFormatter.format(summary.total_income)}</p>
               </div>
               <div className="flex flex-col p-3 bg-neo-orange border-[3px] border-black shadow-brutal">
                  <p className="text-[10px] uppercase mb-1">Despesas</p>
                  <p className="text-lg font-black leading-none">{balanceFormatter.format(summary.total_expense)}</p>
               </div>
               <div className="flex flex-col p-3 bg-neo-cyan border-[3px] border-black shadow-brutal">
                  <p className="text-[10px] uppercase mb-1">Dívidas</p>
                  <p className="text-lg font-black leading-none">{balanceFormatter.format(summary.total_debt_payment)}</p>
               </div>
            </div>

            {/* Categories Section */}
            <div className="flex flex-col gap-4">
               <div className="flex justify-between items-center px-1">
                  <h3 className="text-xl font-black uppercase">Categorias</h3>
                  <span className="text-xs underline decoration-2 cursor-pointer">VER TUDO</span>
               </div>
               <div className="p-6 bg-white border-[3px] border-black shadow-brutal flex flex-col gap-6">
                  {/* Essentials */}
                  <div className="flex flex-col gap-1">
                     <div className="flex justify-between text-xs uppercase tracking-tighter mb-1">
                        <span>Essenciais</span>
                        <span>{((summary.pots.essentials / summary.total_expense) * 100).toFixed(0)}%</span>
                     </div>
                     <div className="h-6 w-full border-[3px] border-black bg-neo-bg">
                        <div className="h-full bg-neo-purple border-r-[3px] border-black" style={{ width: '50%' }}></div>
                     </div>
                  </div>
                  {/* Leisure */}
                  <div className="flex flex-col gap-1">
                     <div className="flex justify-between text-xs uppercase tracking-tighter mb-1">
                        <span>Lazer</span>
                        <span>{((summary.pots.leisure / summary.total_expense) * 100).toFixed(0)}%</span>
                     </div>
                     <div className="h-6 w-full border-[3px] border-black bg-neo-bg">
                        <div className="h-full bg-neo-orange border-r-[3px] border-black" style={{ width: '20%' }}></div>
                     </div>
                  </div>
                  {/* Debts */}
                  <div className="flex flex-col gap-1">
                     <div className="flex justify-between text-xs uppercase tracking-tighter mb-1">
                        <span>Dívidas</span>
                        <span>{((summary.pots.debts / summary.total_expense) * 100).toFixed(0)}%</span>
                     </div>
                     <div className="h-6 w-full border-[3px] border-black bg-neo-bg">
                        <div className="h-full bg-neo-cyan border-r-[3px] border-black" style={{ width: '15%' }}></div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Due Payments Section (Mock Data) */}
            <div className="flex flex-col gap-4 pb-10">
               <h3 className="text-xl font-black uppercase px-1">Vencimentos</h3>
               <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 bg-white border-[3px] border-black shadow-brutal">
                     <div className="flex items-center gap-3">
                        <div className="size-10 border-[3px] border-black bg-neo-purple flex items-center justify-center">
                           <span className="material-symbols-outlined font-black">home</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="uppercase text-sm leading-none">Aluguel</span>
                           <span className="text-[10px] uppercase font-medium">Em 2 dias</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="text-sm font-black">- R$ 2.500</span>
                     </div>
                  </div>
                  {/* Add more items relative to context if needed */}
               </div>
            </div>
         </main>

         {/* Floating Action Button */}
         <Link href="/transactions/new-expense">
            <button className="absolute bottom-28 right-6 size-16 rounded-full bg-neo-blue border-[3px] border-black shadow-brutal flex items-center justify-center text-white z-50 active:translate-y-[2px] active:shadow-none transition-all">
               <span className="material-symbols-outlined text-4xl font-black">add</span>
            </button>
         </Link>

         {/* Bottom Nav */}
         <nav className="absolute bottom-0 w-full h-24 bg-white border-t-[3px] border-black flex justify-around items-center px-4 z-40">
            <Link href="/dashboard" className="flex flex-col items-center gap-1 p-2 text-black">
               <span className="material-symbols-outlined font-black text-3xl">grid_view</span>
               <span className="text-[10px] font-black uppercase tracking-tighter">Início</span>
            </Link>
            <Link href="/transactions" className="flex flex-col items-center gap-1 p-2 text-black/40 hover:text-black transition-colors">
               <span className="material-symbols-outlined font-black text-3xl">receipt_long</span>
               <span className="text-[10px] font-black uppercase tracking-tighter">Extrato</span>
            </Link>
            <div className="w-10"></div> {/* Spacer for FAB */}
            <Link href="/planning" className="flex flex-col items-center gap-1 p-2 text-black/40 hover:text-black transition-colors">
               <span className="material-symbols-outlined font-black text-3xl">pie_chart</span>
               <span className="text-[10px] font-black uppercase tracking-tighter">Budget</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-black/40 hover:text-black transition-colors">
               <span className="material-symbols-outlined font-black text-3xl">person</span>
               <span className="text-[10px] font-black uppercase tracking-tighter">Perfil</span>
            </Link>
         </nav>
      </div>
   );
}
