import { NeoLayout } from "@/components/NeoLayout";
import { NeoInput } from "@/components/NeoInput";
import { NeoButton } from "@/components/NeoButton";
import Link from "next/link";

export default function AddRevenue() {
  return (
    <NeoLayout title="Nova Receita" showNav={false}>
       {/* Amount Input */}
       <div className="flex flex-col items-center justify-center py-6 border-[3px] border-black bg-retro-green shadow-brutal -rotate-1 hover:rotate-0 transition-transform mb-6">
          <span className="text-sm font-bold uppercase mb-1 opacity-70 tracking-widest">Valor da receita</span>
          <div className="relative flex items-center justify-center gap-2">
             <span className="text-4xl font-black opacity-50 select-none">R$</span>
             <input autoFocus className="w-48 bg-transparent text-center text-5xl font-black placeholder:text-black/20 focus:outline-none border-none p-0 caret-black" inputMode="decimal" placeholder="0,00" type="text"/>
          </div>
       </div>

       {/* Form Fields */}
       <div className="flex flex-col gap-6">
          <NeoInput label="Descrição" placeholder="Ex: Salário, Projeto X..." />
          
          {/* Type Selector */}
          <div>
            <label className="text-sm font-bold uppercase mb-1 block">Tipo</label>
            <div className="flex bg-white border-[3px] border-black shadow-brutal">
                <label className="flex-1 cursor-pointer">
                    <input type="radio" name="revenue_type" value="fixo" className="peer sr-only" defaultChecked />
                    <div className="flex items-center justify-center py-3 font-bold uppercase peer-checked:bg-black peer-checked:text-white transition-all hover:bg-black/10">
                        Fixo
                    </div>
                </label>
                <div className="w-[3px] bg-black"></div>
                <label className="flex-1 cursor-pointer">
                    <input type="radio" name="revenue_type" value="variavel" className="peer sr-only" />
                    <div className="flex items-center justify-center py-3 font-bold uppercase peer-checked:bg-black peer-checked:text-white transition-all hover:bg-black/10">
                        Variável
                    </div>
                </label>
            </div>
          </div>

          <div className="flex items-center justify-between border-[3px] border-black bg-white p-4 shadow-brutal hover:translate-x-1 hover:shadow-none transition-all cursor-pointer">
             <span className="font-bold uppercase">Valor varia mensalmente?</span>
             <label className="relative flex h-8 w-14 cursor-pointer items-center border-[3px] border-black bg-white p-0.5 transition-colors">
                 <input className="invisible absolute peer" type="checkbox"/>
                 <div className="h-full w-6 bg-black peer-checked:translate-x-6 transition-transform"></div>
             </label>
          </div>

          <div className="flex gap-4">
             <div className="flex-1">
               <NeoInput label="Data" type="date" className="bg-white" defaultValue={new Date().toISOString().split('T')[0]} />
             </div>
          </div>
          
          <div>
              <label className="text-sm font-bold uppercase mb-1 block">Conta de Destino</label>
               <button className="w-full bg-white border-[3px] border-black p-3 font-bold flex items-center justify-between shadow-brutal cursor-pointer active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all hover:bg-gray-50 text-left">
                  <div className="flex items-center gap-3">
                     <span className="material-symbols-outlined text-2xl">account_balance</span>
                     <span>Nubank</span>
                  </div>
                  <span className="material-symbols-outlined font-bold">expand_more</span>
               </button>
          </div>

          <div>
              <label className="text-sm font-bold uppercase mb-1 block">Responsável</label>
               <button className="w-full bg-white border-[3px] border-black p-3 font-bold flex items-center justify-between shadow-brutal cursor-pointer active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all hover:bg-gray-50 text-left">
                  <div className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full border-2 border-black bg-retro-purple flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-xs font-bold">person</span>
                     </div>
                     <span>Eu</span>
                  </div>
                  <span className="material-symbols-outlined font-bold">expand_more</span>
               </button>
          </div>
       </div>

       {/* Footer Action */}
       <div className="mt-8 pb-8">
          <NeoButton className="w-full text-xl py-4 uppercase tracking-tighter bg-retro-green hover:bg-retro-green/80" size="lg">
             Salvar Receita
          </NeoButton>
          <div className="flex justify-center mt-4">
             <Link href="/dashboard" className="text-xs font-bold uppercase underline decoration-2 underline-offset-2 hover:bg-retro-green px-1 transition-colors">Cancelar</Link>
          </div>
       </div>
    </NeoLayout>
  )
}
