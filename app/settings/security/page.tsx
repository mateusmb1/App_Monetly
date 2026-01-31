'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function SecurityPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-retro-bg font-sans pb-10">
            <header className="p-6 border-b-[3px] border-black bg-white flex items-center justify-between sticky top-0 z-10">
                <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center border-[3px] border-black rounded-full bg-white shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="text-xl font-black uppercase tracking-wider">Segurança</h1>
                <div className="w-10"></div>
            </header>

            <main className="p-6 max-w-md mx-auto space-y-6">
                <section className="bg-white border-[3px] border-black p-6 shadow-brutal">
                    <h2 className="text-xl font-black uppercase mb-4">Biometria</h2>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-fingerprint text-2xl"></i>
                            <span className="font-bold">Face ID / Touch ID</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-14 h-8 bg-gray-200 border-2 border-black peer-focus:outline-none peer-checked:bg-neo-green rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"></div>
                            <div className="absolute left-1 top-1 bg-white border-2 border-black w-6 h-6 peer-checked:translate-x-6 transition-transform"></div>
                        </label>
                    </div>
                </section>

                <section className="bg-white border-[3px] border-black p-6 shadow-brutal">
                    <h2 className="text-xl font-black uppercase mb-4">Senha do App</h2>
                    <button className="w-full bg-neo-cyan border-[3px] border-black p-3 font-bold uppercase hover:bg-cyan-300 transition-colors shadow-brutal mb-3">
                        Alterar PIN
                    </button>
                    <button className="w-full bg-white border-[3px] border-black p-3 font-bold uppercase hover:bg-gray-50 transition-colors shadow-brutal">
                        Esqueci meu PIN
                    </button>
                </section>
            </main>
        </div>
    );
}
