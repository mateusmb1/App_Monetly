'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFinance } from '@/context/FinanceContext';

export default function NewExpensePage() {
    const router = useRouter();
    const { addExpense } = useFinance();
    const [amount, setAmount] = useState('0,00');
    const [description, setDescription] = useState('');
    const [selectedUser, setSelectedUser] = useState<string>('user'); // 'user', 'joao'
    const [frequency, setFrequency] = useState<'unique' | 'fixed' | 'installments'>('unique');

    const handleSave = (addAnother: boolean = false) => {
        const numericAmount = parseFloat(amount.replace('.', '').replace(',', '.'));

        addExpense({
            amount: numericAmount,
            date: new Date().toISOString(),
            description: description || 'Despesa sem descrição',
            category: 'Outros',
            recurrence: frequency === 'fixed' ? 'monthly' : 'none',
            is_fixed: frequency === 'fixed',
            is_variable_recurrent: false,
            is_unexpected: false,
            payment_method: 'credit_card', // Defaulting for MVP
            account_id: 'a1',
            is_paid: true
        });

        if (addAnother) {
            setAmount('0,00');
            setDescription('');
            alert('Despesa salva! Adicione a próxima.');
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
            {/* Mobile Container */}
            <main className="w-full max-w-md bg-neo-cream min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans border-[3px] border-black">
                {/* Header */}
                <header className="flex items-center justify-between px-6 pt-12 pb-4">
                    <button onClick={() => router.back()} className="text-3xl text-black hover:scale-110 transition-transform p-2">
                        <i className="fa-solid fa-times"></i>
                    </button>
                    <h1 className="text-xl font-bold text-black tracking-wide">Nova Despesa</h1>
                    <div className="w-8"></div>
                </header>

                {/* Content Scrollable Area */}
                <div className="flex-1 overflow-y-auto px-6 pb-40 no-scrollbar">
                    {/* Amount Section */}
                    <section className="mt-4 mb-8 text-center">
                        <label className="block text-sm font-bold mb-2 text-black">Valor da despesa</label>
                        <div className="bg-white border-[3px] border-black h-20 flex items-center justify-between px-4">
                            <span className="text-3xl font-extrabold text-black">R$</span>
                            <input
                                className="text-5xl font-bold text-right w-full bg-transparent border-none p-0 focus:ring-0 placeholder-black text-black outline-none"
                                inputMode="decimal"
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </section>

                    {/* 'Quem Pagou?' Section */}
                    <section className="mb-8">
                        <label className="block text-xs font-bold uppercase tracking-wider mb-4 text-black">QUEM PAGOU?</label>
                        <div className="flex space-x-6">
                            {/* User 1: You */}
                            <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedUser('user')}>
                                <div className={`relative w-16 h-16 rounded-full border-[3px] border-black flex items-center justify-center overflow-hidden ${selectedUser === 'user' ? 'bg-neo-yellow' : 'bg-white'}`}>
                                    <div className="w-14 h-14 rounded-full border-2 border-transparent overflow-hidden">
                                        <img alt="Você" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAguA1cxwZR33CdoIJ_1iwzJb3h35VPvd9kCchFczQVeTSW83VDioeFbcELL6yJFKlYH7Iq6FUxe19cNmeoi-mwjfITtWM0LZGhqqLCm57RnDnEMp5bRirUzy7p6g-zHGCChFUPidebGLopZXx72nGE7Bec4ZGsZpdN61Z3Z2p_73wZbTre5Tjjq60D8LPEo0khTeieRoCffqB7viCibmFzWLDCYNoKiayWX9ey3dwyHiGCTLvKe4bCo6wJ5Dudjq934z7eyPeHV9k" />
                                    </div>
                                    {selectedUser === 'user' && (
                                        <div className="absolute bottom-0 right-0 bg-black text-neo-yellow rounded-full w-6 h-6 flex items-center justify-center border-2 border-white text-xs z-10">
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                    )}
                                </div>
                                <span className="mt-2 text-sm font-medium text-black">Você</span>
                            </div>

                            {/* User 2: Joao */}
                            <div className={`flex flex-col items-center cursor-pointer transition-opacity ${selectedUser === 'joao' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`} onClick={() => setSelectedUser('joao')}>
                                <div className={`w-16 h-16 rounded-full border-[3px] border-black flex items-center justify-center overflow-hidden ${selectedUser === 'joao' ? 'bg-neo-yellow' : 'bg-white'}`}>
                                    <img alt="João" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlQieNP_uyvmuMU8kRZKoUwes_npB1EjkX5OHMj-WAsuEzcIVV41DyrM9rMTXzyslarSEzO1v6snqk39J-EouXslc21c0-Dbsd85Uj_JY6PDpG_hwHXCpAQA9qmM9FHdnMmQs5kmpSzRy_mZEZhdE0LpLfVOvsLkAhNbAb26lZ-KXufIaVvBXa50I_l58tJ0DyB4aYMNEnpB55W_0-2QZZ3dzdqXs19KjQS8cQQG1AxsZ0jraF0E22UeKczwZ7n2V6f0lz-zlsQOU" />
                                    {selectedUser === 'joao' && (
                                        <div className="absolute bottom-0 right-0 bg-black text-neo-yellow rounded-full w-6 h-6 flex items-center justify-center border-2 border-white text-xs z-10">
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                    )}
                                </div>
                                <span className="mt-2 text-sm font-medium text-black">João</span>
                            </div>

                            {/* Add New User */}
                            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                <div className="w-16 h-16 rounded-full border-[3px] border-black bg-white flex items-center justify-center">
                                    <i className="fa-solid fa-plus text-2xl text-black"></i>
                                </div>
                                <span className="mt-2 text-sm font-medium text-black">Novo</span>
                            </div>
                        </div>
                    </section>

                    {/* Details Row (Data & Categoria) */}
                    <section className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-black">Data</label>
                            <div className="bg-white border-[3px] border-black h-12 flex items-center px-3 cursor-pointer">
                                <i className="fa-solid fa-calendar text-xl mr-3 text-black"></i>
                                <span className="font-bold text-black">Hoje</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 text-black">Categoria</label>
                            <div className="bg-white border-[3px] border-black h-12 flex items-center justify-between px-3 cursor-pointer">
                                <div className="flex items-center overflow-hidden">
                                    <i className="fa-solid fa-cart-shopping text-lg mr-2 text-black"></i>
                                    <span className="font-bold truncate text-black">Mercado</span>
                                </div>
                                <i className="fa-solid fa-chevron-down text-sm text-black"></i>
                            </div>
                        </div>
                    </section>

                    {/* Frequency Section */}
                    <section className="mb-8">
                        <label className="block text-sm font-bold mb-2 text-black">Frequência</label>
                        <div className="flex w-full border-[3px] border-black bg-white">
                            <button
                                onClick={() => setFrequency('unique')}
                                className={`flex-1 py-3 font-bold border-r-2 border-black transition-colors ${frequency === 'unique' ? 'bg-neo-yellow' : 'bg-white hover:bg-gray-50 text-black'}`}
                            >
                                Única
                            </button>
                            <button
                                onClick={() => setFrequency('fixed')}
                                className={`flex-1 py-3 font-bold border-r-2 border-black transition-colors ${frequency === 'fixed' ? 'bg-neo-yellow' : 'bg-white hover:bg-gray-50 text-black'}`}
                            >
                                Fixa
                            </button>
                            <button
                                onClick={() => setFrequency('installments')}
                                className={`flex-1 py-3 font-bold transition-colors ${frequency === 'installments' ? 'bg-neo-yellow' : 'bg-white hover:bg-gray-50 text-black'}`}
                            >
                                Parcelada
                            </button>
                        </div>
                    </section>

                    {/* Payment Section */}
                    <section className="mb-8">
                        <label className="block text-sm font-bold mb-2 text-black">Pagamento</label>
                        <div className="bg-white border-[3px] border-black p-3 flex items-center justify-between cursor-pointer">
                            <div className="flex items-center">
                                <div className="w-10 h-8 bg-black rounded-sm flex items-center justify-center mr-3">
                                    <div className="w-6 h-4 bg-white rounded-sm"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm leading-tight text-black">Nubank Crédito</span>
                                    <span className="text-xs text-gray-600 font-medium">Vence em 05/Nov</span>
                                </div>
                            </div>
                            <i className="fa-solid fa-chevron-right text-black"></i>
                        </div>
                    </section>

                    {/* Description Section */}
                    <section className="mb-8 pl-1">
                        <label className="block text-sm font-bold mb-2 text-black">Descrição (Opcional)</label>
                        <div className="bg-white border-[3px] border-black h-12 flex items-center px-3">
                            <i className="fa-solid fa-pen text-sm mr-3 text-black"></i>
                            <input
                                className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium placeholder-gray-800 text-black outline-none"
                                placeholder="Ex: Jantar de aniversário"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <footer className="absolute bottom-0 w-full bg-neo-cream px-6 pb-8 pt-4">
                    <button
                        onClick={() => handleSave(false)}
                        className="w-full bg-neo-purple text-white font-bold text-lg py-4 border-[3px] border-black shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                    >
                        Salvar Despesa
                    </button>
                    <div className="text-center mt-4">
                        <button
                            onClick={() => handleSave(true)}
                            className="text-sm font-bold text-black hover:underline"
                        >
                            Salvar e adicionar outra
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}
