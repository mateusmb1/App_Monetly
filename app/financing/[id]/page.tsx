'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function FinancingDetailsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white font-sans pb-10">
            <header className="sticky top-0 z-50 bg-white border-b-[4px] border-black px-4 py-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="p-1 hover:bg-gray-100 rounded focus:outline-none">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                        <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="square" strokeLinejoin="miter"></path>
                    </svg>
                </button>
                <h1 className="text-lg font-bold text-center leading-tight">Detalhes do Financiamento</h1>
                <button className="p-1 hover:bg-gray-100 rounded focus:outline-none">
                    <i className="fa-solid fa-pen text-xl"></i>
                </button>
            </header>

            <main className="p-4 max-w-md mx-auto space-y-8">
                {/* Main Info Card */}
                <section className="bg-neo-purple border-[4px] border-black p-5 shadow-brutal space-y-3 relative overflow-hidden text-black">
                    <div>
                        <h2 className="font-black uppercase tracking-tighter leading-none text-6xl">SUV 2024</h2>
                        <p className="font-medium text-xs mt-1">Santander Financiamentos</p>
                    </div>
                    <div className="pt-2">
                        <p className="font-bold text-sm">Parcela atual R$ 1.250,00</p>
                    </div>
                    <div>
                        <p className="font-black uppercase text-4xl">10 de 60 pagas</p>
                    </div>
                    <div className="w-full h-8 border-[4px] border-black bg-transparent rounded-full overflow-hidden mt-2 relative">
                        <div className="h-full bg-black w-[16%] absolute top-0 left-0 rounded-full"></div>
                    </div>
                </section>

                {/* Action Card */}
                <section className="bg-neo-yellow border-[4px] border-black p-4 shadow-brutal flex flex-col justify-between gap-3 text-black">
                    <h3 className="font-black leading-tight max-w-[70%] text-3xl">Confirmar valor de Abril</h3>
                    <div className="w-full text-right ml-auto">
                        <button className="bg-neo-blue border-[3px] border-black px-4 py-2 font-bold text-white shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                            Confirmar
                        </button>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="grid grid-cols-2 gap-4 text-black">
                    <div className="bg-white border-[4px] border-black p-4 shadow-brutal">
                        <p className="text-xs font-normal mb-1">Total Pago</p>
                        <p className="text-3xl font-black">R$ 12.500</p>
                    </div>
                    <div className="bg-white border-[4px] border-black p-4 shadow-brutal">
                        <p className="text-xs font-normal mb-1">Restante Estimado</p>
                        <p className="text-3xl font-black">R$ 62.500</p>
                    </div>
                </section>

                {/* History Section */}
                <section className="space-y-4 pt-4 text-black">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-black">Histórico e Projeções</h3>
                            <p className="text-sm font-medium text-gray-600">Em processo de valor de Abril</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {/* Paid Item */}
                        <div className="bg-white border-[4px] border-black p-2 flex items-center justify-between shadow-brutal-sm">
                            <div className="flex items-center gap-3">
                                <div className="bg-neo-green border-[3px] border-black px-3 py-2 text-center font-bold leading-tight w-16">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-sm font-bold uppercase">MAI</span>
                                        <span className="text-xl font-black">24</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-neo-green border-[3px] border-black px-4 py-1 font-bold text-sm">Pago</div>
                        </div>

                        {/* Future Item */}
                        <div className="bg-white border-[4px] border-black p-2 flex items-center justify-between shadow-brutal-sm">
                            <div className="flex items-center gap-3">
                                <div className="bg-white border-[3px] border-black px-3 py-2 text-center font-bold leading-tight w-16">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-sm font-bold uppercase">JUN</span>
                                        <span className="text-xl font-black">24</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-400 border-[3px] border-black px-4 py-1 font-bold text-sm">Futuro</div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
