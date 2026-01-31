'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFinance } from '@/context/FinanceContext';
import { INCOME_CATEGORIES } from '@/constants/categories';

export default function NewIncomePage() {
    const router = useRouter();
    const { addIncome } = useFinance();
    const [amount, setAmount] = useState('0,00');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(INCOME_CATEGORIES[0]);

    const handleSave = () => {
        const numericAmount = parseFloat(amount.replace('.', '').replace(',', '.'));

        addIncome({
            amount: numericAmount,
            date: new Date().toISOString(),
            description: description || 'Receita sem descrição',
            type: 'variable',
            source: selectedCategory.name,
            recurrence: 'none',
            is_salary: selectedCategory.id === 'salary',
            salary_can_vary: false,
            account_id: 'a1' // Default account
        });

        router.push('/dashboard');
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
            <main className="w-full max-w-md bg-neo-cream min-h-screen relative shadow-2xl overflow-hidden flex flex-col border-[3px] border-black">
                {/* Header */}
                <header className="flex items-center justify-between px-6 pt-12 pb-4 bg-neo-green border-b-[3px] border-black">
                    <button onClick={() => router.back()} className="text-3xl text-black hover:scale-110 transition-transform p-2">
                        <i className="fa-solid fa-times"></i>
                    </button>
                    <h1 className="text-xl font-bold text-black tracking-wide">Nova Receita</h1>
                    <div className="w-8"></div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar bg-neo-cream pt-6">
                    {/* Amount */}
                    <section className="mb-8 text-center">
                        <label className="block text-sm font-bold mb-2 text-black">Valor da receita</label>
                        <div className="bg-white border-[3px] border-black h-20 flex items-center justify-between px-4 shadow-brutal">
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

                    {/* Category Selection */}
                    <section className="mb-8">
                        <label className="block text-xs font-bold uppercase tracking-wider mb-4 text-black">CategoriA</label>
                        <div className="grid grid-cols-4 gap-4">
                            {INCOME_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`flex flex-col items-center gap-2 p-2 rounded-lg border-2 ${selectedCategory.id === cat.id ? 'border-black bg-white shadow-brutal-sm' : 'border-transparent opacity-50'}`}
                                >
                                    <div className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center ${cat.color}`}>
                                        <i className={`fa-solid ${cat.icon} text-lg`}></i>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Description */}
                    <section className="mb-8">
                        <label className="block text-sm font-bold mb-2 text-black">Descrição</label>
                        <div className="bg-white border-[3px] border-black h-12 flex items-center px-3 shadow-brutal-sm">
                            <i className="fa-solid fa-pen text-sm mr-3 text-black"></i>
                            <input
                                className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium placeholder-gray-800 text-black outline-none"
                                placeholder="Ex: Freela design"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <footer className="absolute bottom-0 w-full bg-neo-cream px-6 pb-8 pt-4 border-t-[3px] border-black">
                    <button
                        onClick={handleSave}
                        className="w-full bg-neo-green text-black font-bold text-lg py-4 border-[3px] border-black shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                    >
                        Receber
                    </button>
                </footer>
            </main>
        </div>
    );
}
