'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function RemindersPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-neo-cream font-sans pb-10">
            <header className="p-6 border-b-[3px] border-black bg-white flex items-center justify-between sticky top-0 z-10">
                <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center border-[3px] border-black rounded-full bg-white shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="text-xl font-black uppercase tracking-wider">Lembretes</h1>
                <div className="w-10"></div>
            </header>

            <main className="p-6 max-w-md mx-auto space-y-6">
                {/* Daily Habit Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 border-b-[3px] border-black inline-block">Hábitos Diários</h2>
                    <article className="border-[3px] border-black bg-white mb-6">
                        <div className="p-4 border-b-[3px] border-black">
                            <div className="flex justify-between items-start mb-2 gap-2">
                                <h3 className="text-lg font-bold leading-tight">Registrar gastos diários</h3>
                                <span className="text-white font-bold text-xs px-2 py-1 border-[3px] border-black uppercase shrink-0 bg-neo-purple">ATIVADO</span>
                            </div>
                            <p className="text-sm font-medium leading-snug">Receba um lembrete para categorizar suas compras do dia.</p>
                        </div>
                        <div className="flex justify-between items-center bg-neo-cream p-4">
                            <div className="flex items-center gap-2">
                                <i className="fa-regular fa-clock text-xl"></i>
                                <span className="font-bold text-lg">Horário</span>
                            </div>
                            <div className="text-black font-bold text-lg px-3 py-1 border-[3px] border-black bg-neo-green">20:00</div>
                        </div>
                    </article>
                </section>

                {/* Monthly Routine Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4 border-b-[3px] border-black inline-block">Rotina Mensal</h2>
                    <article className="border-[3px] border-black bg-white mb-6">
                        <div className="p-4 border-b-[3px] border-black">
                            <div className="flex justify-between items-start mb-2 gap-2">
                                <h3 className="text-lg font-bold leading-tight">Confirmar salário mensal</h3>
                                <span className="text-black font-bold text-xs px-2 py-1 border-[3px] border-black uppercase shrink-0 bg-gray-200">DESATIVADO</span>
                            </div>
                            <p className="text-sm font-medium leading-snug">Lembrete para confirmar a entrada da renda no início do mês.</p>
                        </div>
                        <div className="flex justify-between items-center bg-neo-cream p-4">
                            <div className="flex items-center gap-2">
                                <i className="fa-regular fa-clock text-xl"></i>
                                <span className="font-bold text-lg">Horário</span>
                            </div>
                            <div className="text-black font-bold text-lg px-3 py-1 border-[3px] border-black bg-white">09:00</div>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
}
