'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GroupPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-neo-cream font-sans pb-10">
            <main className="max-w-md mx-auto p-4 flex flex-col gap-6">
                {/* Header */}
                <header className="flex items-center justify-between py-2">
                    <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center border-[3px] border-black rounded-full bg-white shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                        <i className="fa-solid fa-arrow-left text-lg"></i>
                    </button>
                    <h1 className="text-xl font-black uppercase tracking-wide">Grupo Familiar</h1>
                    <button className="w-10 h-10 flex items-center justify-center border-[3px] border-black rounded-full bg-white shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                        <i className="fa-solid fa-gear text-lg"></i>
                    </button>
                </header>

                {/* Invite Card */}
                <section className="bg-white border-[3px] border-black rounded-xl shadow-hard p-6 text-center flex flex-col items-center gap-4 relative overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-neo-green flex items-center justify-center mb-1 overflow-hidden border-2 border-black">
                        <i className="fa-solid fa-envelope-open-text text-3xl"></i>
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black">Convide membros</h2>
                        <p className="font-medium leading-tight text-black">Compartilhe o código abaixo para adicionar sua família.</p>
                    </div>
                    <div className="bg-neo-yellow px-6 py-3 rounded-lg w-full max-w-[200px] transform -rotate-1 hover:rotate-0 transition-transform duration-300 border-2 border-black">
                        <span className="text-2xl font-black tracking-widest block">X9F-22A</span>
                    </div>
                    <button className="w-full bg-neo-cyan rounded-lg py-3 shadow-hard font-bold text-lg flex items-center justify-center gap-2 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all mt-2 border-2 border-black">
                        <span>Enviar Convite</span>
                        <i className="fa-solid fa-share-nodes"></i>
                    </button>
                </section>

                {/* Members List */}
                <section className="flex flex-col gap-3">
                    <h3 className="text-lg font-black uppercase tracking-wide ml-1">Membros</h3>
                    {/* Member 1 */}
                    <div className="bg-neo-pink rounded-xl shadow-hard p-4 flex items-center justify-between active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer border-2 border-black">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full border-[3px] border-black bg-white overflow-hidden shrink-0">
                                <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbiT9m-czcy2zK27iyv4H6dNqkMEvT2UlOvjlxBmBe58T-0uc24wUEYc1kvNACagyaACN3SdveO0mus4HHaMNap1-LbCrP4QTvj14WvJ-aB5HhC0EZbP5FJnqqDzKckUSRiQrf1RFZClCKbFzN025eq-oKPB88FWOKU7jGPsqeg1pZSQzE3RCvZ5p1a4yDnlOTWGopakISfRaY5YRylUYYDczMACL8sLTFIvqh0QJTAkmg8-rRpJSSedgeX45Ub0BSz6d64E4w9QY" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-lg leading-none">João Silva</h4>
                                    <span className="bg-neo-green border-2 border-black text-xs font-bold px-1.5 py-0.5 rounded shadow-hard-sm leading-none">ADMIN</span>
                                </div>
                                <p className="text-sm font-medium mt-1 text-gray-800">joao.silva@email.com</p>
                            </div>
                        </div>
                        <i className="fa-solid fa-chevron-right text-xl"></i>
                    </div>
                </section>

                {/* Stats Summary */}
                <section className="flex flex-col gap-3">
                    <div className="bg-white border-[3px] border-black rounded-xl shadow-hard p-5 flex flex-col gap-6">
                        {/* Person 1 */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-end mb-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden">
                                        <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbiT9m-czcy2zK27iyv4H6dNqkMEvT2UlOvjlxBmBe58T-0uc24wUEYc1kvNACagyaACN3SdveO0mus4HHaMNap1-LbCrP4QTvj14WvJ-aB5HhC0EZbP5FJnqqDzKckUSRiQrf1RFZClCKbFzN025eq-oKPB88FWOKU7jGPsqeg1pZSQzE3RCvZ5p1a4yDnlOTWGopakISfRaY5YRylUYYDczMACL8sLTFIvqh0QJTAkmg8-rRpJSSedgeX45Ub0BSz6d64E4w9QY" />
                                    </div>
                                    <span className="font-bold text-lg">João</span>
                                </div>
                                <span className="font-black text-sm">62% dos gastos</span>
                            </div>
                            <div className="w-full rounded-full border-2 border-black overflow-hidden h-4" style={{ background: 'linear-gradient(90deg, #4ADE80 0%, #4ADE80 62%, #00C2FF 62%, #00C2FF 100%)' }}></div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
