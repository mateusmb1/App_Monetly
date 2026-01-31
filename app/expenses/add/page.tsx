import { NeoLayout } from "@/components/NeoLayout";
import { NeoInput } from "@/components/NeoInput";
import { NeoButton } from "@/components/NeoButton";
import Link from "next/link";

export default function AddExpense() {
  return (
    <NeoLayout title="Nova Despesa" showNav={false}>
       {/* Amount Input */}
       <div className="flex flex-col items-center justify-center py-6 border-[3px] border-black bg-retro-yellow shadow-brutal rotate-1 hover:rotate-0 transition-transform mb-6">
          <span className="text-sm font-bold uppercase mb-1 opacity-70 tracking-widest">Valor da despesa</span>
          <div className="relative flex items-center justify-center gap-2">
             <span className="text-4xl font-black opacity-50 select-none">R$</span>
             <input autoFocus className="w-48 bg-transparent text-center text-5xl font-black placeholder:text-black/20 focus:outline-none border-none p-0 caret-black" inputMode="decimal" placeholder="0,00" type="text"/>
          </div>
       </div>

       {/* User Selector */}
       <div className="mb-4">
          <label className="text-xs font-bold uppercase tracking-widest mb-2 block px-1">Quem pagou?</label>
          <div className="flex items-center gap-4 overflow-x-auto pb-2 pl-1">
             <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-16 h-16 rounded-full border-[3px] border-black bg-retro-purple flex items-center justify-center shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all relative">
                   <span className="material-symbols-outlined text-white text-3xl">person</span>
                   <div className="absolute -bottom-1 -right-1 bg-retro-green border-2 border-black w-6 h-6 flex items-center justify-center rounded-full">
                      <span className="material-symbols-outlined text-xs font-bold text-black">check</span>
                   </div>
                </div>
                <span className="text-xs font-bold uppercase group-hover:text-retro-purple transition-colors">Você</span>
             </div>
             <div className="flex flex-col items-center gap-2 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full border-[3px] border-black bg-white flex items-center justify-center shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
                   <span className="material-symbols-outlined text-black text-3xl">person_outline</span>
                </div>
                <span className="text-xs font-bold uppercase group-hover:text-retro-purple transition-colors">João</span>
             </div>
             <div className="flex flex-col items-center gap-2 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full border-[3px] border-black bg-white flex items-center justify-center shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all border-dashed">
                   <span className="material-symbols-outlined text-black text-3xl">add</span>
                </div>
                <span className="text-xs font-bold uppercase group-hover:text-retro-purple transition-colors">Novo</span>
             </div>
          </div>
       </div>

       {/* Form Fields */}
       <div className="flex flex-col gap-6">
          <div className="flex gap-4">
             <div className="flex-1">
               <NeoInput label="Data" type="date" className="bg-white" defaultValue={new Date().toISOString().split('T')[0]} />
             </div>
          </div>
          
          <div>
             <label className="text-sm font-bold uppercase mb-1 block">Categoria</label>
             <button className="w-full bg-white border-[3px] border-black p-3 font-bold flex items-center justify-between shadow-brutal cursor-pointer active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all hover:bg-gray-50 text-left">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-retro-red border-2 border-black flex items-center justify-center shadow-brutal-sm">
                      <span className="material-symbols-outlined text-sm text-white">shopping_cart</span>
                   </div>
                   <span>Mercado</span>
                </div>
                <span className="material-symbols-outlined font-bold">expand_more</span>
             </button>
          </div>
          
          <div>
              <label className="text-sm font-bold uppercase mb-1 block">Pagamento</label>
               <button className="w-full bg-white border-[3px] border-black p-3 font-bold flex items-center justify-between shadow-brutal cursor-pointer active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all hover:bg-gray-50 text-left">
                  <div className="flex items-center gap-3">
                     <span className="material-symbols-outlined text-2xl">credit_card</span>
                     <div className="flex flex-col leading-none gap-1">
                        <span>Nubank Crédito</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Vence 05/Nov</span>
                     </div>
                  </div>
                  <span className="material-symbols-outlined font-bold">expand_more</span>
               </button>
          </div>

          <NeoInput label="Descrição" placeholder="Ex: Jantar de aniversário..." />
       </div>

       {/* Footer Action */}
       <div className="mt-8 pb-8">
          <NeoButton className="w-full text-xl py-4 uppercase tracking-tighter" size="lg">
             Salvar Despesa
          </NeoButton>
          <div className="flex justify-center mt-4">
             <Link href="/dashboard" className="text-xs font-bold uppercase underline decoration-2 underline-offset-2 hover:bg-retro-yellow px-1 transition-colors">Cancelar</Link>
          </div>
       </div>
    </NeoLayout>
  )
}
