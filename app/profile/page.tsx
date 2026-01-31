'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFinance } from '@/context/FinanceContext';

export default function ProfilePage() {
   const router = useRouter();
   const { user } = useFinance();

   return (
      <div className="min-h-screen bg-retro-bg font-sans pb-24">
         {/* Header */}
         <header className="p-6 border-b-[3px] border-black bg-white flex items-center justify-between sticky top-0 z-10">
            <h1 className="text-2xl font-black uppercase tracking-wider">Perfil</h1>
            <button className="bg-neo-red w-8 h-8 rounded-sm border-2 border-black shadow-brutal-sm"></button>
         </header>

         <main className="p-6 max-w-md mx-auto flex flex-col gap-6">
            {/* Profile Card */}
            <section className="bg-neo-yellow border-[3px] border-black p-6 shadow-brutal flex flex-col items-center relative">
               <div className="w-24 h-24 bg-white rounded-full border-[3px] border-black overflow-hidden mb-3 relative group cursor-pointer">
                  <img
                     alt="Profile"
                     className="w-full h-full object-cover"
                     src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAguA1cxwZR33CdoIJ_1iwzJb3h35VPvd9kCchFczQVeTSW83VDioeFbcELL6yJFKlYH7Iq6FUxe19cNmeoi-mwjfITtWM0LZGhqqLCm57RnDnEMp5bRirUzy7p6g-zHGCChFUPidebGLopZXx72nGE7Bec4ZGsZpdN61Z3Z2p_73wZbTre5Tjjq60D8LPEo0khTeieRoCffqB7viCibmFzWLDCYNoKiayWX9ey3dwyHiGCTLvKe4bCo6wJ5Dudjq934z7eyPeHV9k"}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <i className="fa-solid fa-camera text-white"></i>
                  </div>
               </div>
               <h2 className="text-xl font-black uppercase">{user?.name}</h2>
               <p className="font-bold text-sm text-gray-700 mb-4">{user?.email}</p>
               <span className="bg-black text-white px-3 py-1 font-bold text-xs uppercase tracking-widest border-2 border-transparent">
                  Plano Pro
               </span>
               <button className="absolute top-2 right-2 p-2 hover:bg-black/10 rounded">
                  <i className="fa-solid fa-pen"></i>
               </button>
            </section>

            {/* Menu Options */}
            <section className="flex flex-col gap-4">
               <Link href="/group">
                  <div className="bg-white border-[3px] border-black p-4 shadow-brutal flex items-center justify-between hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-neo-green border-2 border-black flex items-center justify-center">
                           <i className="fa-solid fa-users"></i>
                        </div>
                        <span className="font-bold uppercase">Grupo Familiar</span>
                     </div>
                     <i className="fa-solid fa-chevron-right"></i>
                  </div>
               </Link>

               <Link href="/settings/security">
                  <div className="bg-white border-[3px] border-black p-4 shadow-brutal flex items-center justify-between hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-neo-purple text-white border-2 border-black flex items-center justify-center">
                           <i className="fa-solid fa-lock"></i>
                        </div>
                        <span className="font-bold uppercase">Segurança</span>
                     </div>
                     <i className="fa-solid fa-chevron-right"></i>
                  </div>
               </Link>

               <Link href="/settings/reminders">
                  <div className="bg-white border-[3px] border-black p-4 shadow-brutal flex items-center justify-between hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-neo-orange border-2 border-black flex items-center justify-center">
                           <i className="fa-solid fa-bell"></i>
                        </div>
                        <span className="font-bold uppercase">Lembretes</span>
                     </div>
                     <i className="fa-solid fa-chevron-right"></i>
                  </div>
               </Link>
            </section>

            {/* Logout Button */}
            <button onClick={() => router.push('/login')} className="bg-black text-white border-[3px] border-black p-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
               Sair da Conta
            </button>
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
            <div className="w-10"></div>
            <Link href="/planning" className="flex flex-col items-center gap-1 p-2 text-black/40 hover:text-black transition-colors">
               <span className="material-symbols-outlined font-black text-3xl">pie_chart</span>
               <span className="text-[10px] font-black uppercase tracking-tighter">Budget</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-black">
               <span className="material-symbols-outlined font-black text-3xl">person</span>
               <span className="text-[10px] font-black uppercase tracking-tighter">Perfil</span>
            </Link>
         </nav>
      </div>
   );
}
