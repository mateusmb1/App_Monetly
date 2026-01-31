'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFinance } from '@/context/FinanceContext';

export default function CardDetailsPage() {
   const router = useRouter();
   const params = useParams();
   const { accounts } = useFinance();

   const card = accounts.find(a => a.id === params.id) || accounts.find(a => a.type === 'credit_card');

   if (!card) return <div>Cartão não encontrado</div>;

   return (
      <div className="bg-[#8A05BE] min-h-screen font-sans text-white pb-10">
         {/* Header */}
         <header className="p-6 flex justify-between items-center bg-[#8A05BE]">
            <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center bg-[#9e16d2] rounded-full hover:bg-[#b01ue4] transition-colors">
               <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="flex gap-4">
               <button className="w-10 h-10 flex items-center justify-center bg-[#9e16d2] rounded-full">
                  <i className="fa-solid fa-search"></i>
               </button>
               <button className="w-10 h-10 flex items-center justify-center bg-[#9e16d2] rounded-full">
                  <i className="fa-solid fa-question"></i>
               </button>
            </div>
         </header>

         <main className="px-6 flex flex-col gap-6 max-w-md mx-auto">
            {/* Bill Card */}
            <section className="bg-white text-black p-6 rounded-none border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
               <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                     <div className="w-1 h-6 bg-[#E33535]"></div>
                     <h2 className="text-[#E33535] font-black uppercase text-xl tracking-tighter">Fatura Fechada</h2>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Vence 12/SET</span>
               </div>

               <div className="mb-6 relative z-10">
                  <p className="text-5xl font-black tracking-tighter leading-none mb-1">
                     {card.total_debt?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="font-bold text-gray-400 text-sm">Limite disponível R$ {((card.limit_total || 0) - (card.total_debt || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
               </div>

               {/* Action Buttons */}
               <div className="grid grid-cols-2 gap-3 relative z-10">
                  <button className="bg-[#E33535] text-white font-black py-3 px-4 uppercase tracking-wide border-[3px] border-black hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
                     Pagar Fatura
                  </button>
                  <button className="bg-white text-black font-black py-3 px-4 uppercase tracking-wide border-[3px] border-black hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
                     Parcelar
                  </button>
               </div>

               {/* Watermark Overlay */}
               <i className="fa-brands fa-cc-mastercard absolute -bottom-10 -right-10 text-9xl text-gray-100 transform -rotate-12 z-0"></i>
            </section>

            {/* Strategy Config Section */}
            <section className="bg-[#E7D6F8] text-[#8A05BE] border-[4px] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
               <div className="flex justify-between items-center mb-3">
                  <h3 className="font-black text-lg uppercase">Estratégia de Pagamento</h3>
                  <i className="fa-solid fa-chess-knight text-2xl"></i>
               </div>
               <p className="font-bold text-sm leading-tight mb-4 text-black">
                  Configure como o app deve planejar o pagamento desta fatura nas projeções.
               </p>

               <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-white border-[3px] border-black cursor-pointer hover:bg-gray-50">
                     <input type="radio" name="strategy" className="w-5 h-5 accent-black" defaultChecked />
                     <div className="flex flex-col">
                        <span className="font-black text-black">Pagamento Total</span>
                        <span className="text-xs font-bold text-gray-500">Pagar o valor integral</span>
                     </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white border-[3px] border-black cursor-pointer hover:bg-gray-50">
                     <input type="radio" name="strategy" className="w-5 h-5 accent-black" />
                     <div className="flex flex-col">
                        <span className="font-black text-black">Pagamento Mínimo</span>
                        <span className="text-xs font-bold text-gray-500">Pagar apenas o mínimo rotativo</span>
                     </div>
                  </label>
               </div>
            </section>

            {/* Transaction History Preview */}
            <section>
               <h3 className="font-bold text-white uppercase tracking-widest mb-4 ml-1">Histórico Recente</h3>
               <div className="flex flex-col gap-3">
                  {/* Item 1 */}
                  <div className="bg-white text-black border-[3px] border-black p-3 flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#E6E6E6] rounded-full border-2 border-black flex items-center justify-center">
                           <i className="fa-solid fa-bag-shopping"></i>
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-sm">Mercado Livre</span>
                           <span className="text-xs font-medium text-gray-500">Ontem, 14:30</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="block font-black">R$ 149,90</span>
                        <span className="text-[10px] font-bold bg-black text-white px-1">2x</span>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </div>
   );
}
