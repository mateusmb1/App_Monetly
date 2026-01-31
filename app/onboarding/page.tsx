'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col font-sans p-5 pb-8 bg-retro-bg">
            {/* Header Section */}
            <header className="w-full mb-6" data-purpose="onboarding-progress">
                <div className="flex items-center mb-2 justify-center">
                    <span className="font-bold text-sm tracking-wide text-black">Passo 1 de 3</span>
                </div>
                <div className="w-full h-4 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden rounded-full justify-center">
                    <div className="h-full bg-[#7B1FA2] w-1/4 border-r-2 border-black rounded-l-full"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center w-full max-w-md mx-auto space-y-6">
                {/* Hero Image */}
                <div
                    className="relative w-[150px] h-[150px] rounded-full border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0 mb-4 mx-auto p-1"
                    data-purpose="hero-image"
                >
                    <img
                        alt="Plant sprout on coins"
                        className="w-full h-full object-cover rounded-full"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxMhTThjnu9gCgKL7ar2PerZRO8iSSMdHZxNdfsP0PeKqXCYdq3wcsm92iUTuiRLXuecSaSITNICpOVqUKWKV0JAtMasHEHlV45YfCdNToe31n3AaE7m-OUdRT8Ndl1hcU2gwot4-AjdF75kQyZ39qvGEcGJqw30NCf-esL0flTQe7LhTW_pmZbIeFmZknVe1uIw8m_8e4TLbNnWzzDqcwXpprGiWl_x9VLYe2C_QmkfkQehmj2U5YhSFKuWu4AA3Y7K1pdNN-BW8"
                    />
                </div>

                {/* Headings */}
                <div className="text-center space-y-2" data-purpose="text-intro">
                    <h1 className="text-3xl leading-tight font-extrabold text-black">Vamos começar?</h1>
                    <p className="text-base font-normal leading-snug px-2 text-black">
                        Para iniciar, precisamos de alguns dados básicos. Não se preocupe, você pode ajustar tudo depois.
                    </p>
                </div>

                {/* Form Section */}
                <form className="w-full space-y-6 mt-4" data-purpose="onboarding-form" onSubmit={(e) => { e.preventDefault(); router.push('/dashboard'); }}>
                    {/* Field 1: Income */}
                    <div className="flex flex-col space-y-2 mb-4">
                        <label className="font-bold text-lg text-black" htmlFor="income">Renda mensal aproximada</label>
                        <div className="relative">
                            <input
                                className="w-full h-14 border-2 border-black bg-white rounded-lg px-4 text-xl font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-black focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-500 outline-none"
                                id="income"
                                placeholder="R$ 0,00"
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Field 2: Fixed Expenses (Optional) */}
                    <div className="flex flex-col space-y-2">
                        <label className="font-bold text-lg text-black">Principais despesas fixas <span className="text-sm font-normal text-gray-600">(Opcional)</span></label>
                        <div className="grid grid-cols-1 gap-3">
                            {/* Option 1: Rent */}
                            <button className="flex items-center w-full h-14 px-4 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all text-left text-black" type="button">
                                <div className="w-8 flex justify-center mr-3">
                                    <i className="fa-solid fa-house text-xl"></i>
                                </div>
                                <span className="font-bold">Ex: Aluguel</span>
                            </button>
                            {/* Option 2: Utilities */}
                            <button className="flex items-center w-full h-14 px-4 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all text-left text-black" type="button">
                                <div className="w-8 flex justify-center mr-3">
                                    <i className="fa-solid fa-bolt text-xl"></i>
                                </div>
                                <span className="font-bold">Ex: Contas de consumo</span>
                            </button>
                        </div>
                    </div>

                    {/* Field 3: Credit Card */}
                    <div className="flex flex-col space-y-2">
                        <label className="font-bold text-lg text-black">Você possui cartão de crédito?</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="h-12 bg-[#2979FF] text-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-lg active:translate-x-1 active:translate-y-1 active:shadow-none transition-all" type="button">
                                Sim
                            </button>
                            <button className="h-12 bg-transparent text-black border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-lg hover:bg-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all" type="button">
                                Não
                            </button>
                        </div>
                    </div>

                    {/* Field 4: Loans */}
                    <div className="flex flex-col space-y-2">
                        <label className="font-bold text-lg leading-tight text-black">Possui financiamentos ou empréstimos?</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="h-12 bg-transparent text-black border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-lg hover:bg-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all" type="button">
                                Sim
                            </button>
                            <button className="h-12 bg-transparent text-black border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-lg hover:bg-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all" type="button">
                                Não
                            </button>
                        </div>
                    </div>
                </form>
            </main>

            {/* Footer Actions */}
            <footer className="mt-8 w-full max-w-md mx-auto mb-6" data-purpose="footer-actions">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full h-16 bg-[#FFEA00] text-black border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-lg flex items-center justify-center space-x-2 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                    type="button"
                >
                    <span>Começar meu orçamento</span>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </footer>
        </div>
    );
}
