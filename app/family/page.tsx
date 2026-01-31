import { NeoLayout } from "@/components/NeoLayout";
import { NeoCard } from "@/components/NeoCard";
import { NeoButton } from "@/components/NeoButton";

export default function FamilyGroup() {
  return (
    <NeoLayout title="Grupo Familiar" showNav={true}>
        {/* Invite Section */}
        <section className="bg-retro-yellow border-[3px] border-black p-6 shadow-brutal flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white border-[3px] border-black flex items-center justify-center shadow-brutal-sm">
                <span className="material-symbols-outlined text-4xl font-black">group_add</span>
            </div>
            
            <div className="space-y-1">
                <h3 className="text-xl font-black uppercase tracking-tight">Convide membros</h3>
                <p className="text-sm font-bold opacity-80 leading-tight max-w-[200px] mx-auto">Compartilhe o código abaixo para adicionar sua família.</p>
            </div>
            
            <div className="w-full bg-white border-[3px] border-black border-dashed py-3 px-4 relative group cursor-pointer hover:bg-black hover:text-white transition-colors">
                <p className="text-3xl font-mono font-black tracking-[0.2em]">X9F-22A</p>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined">content_copy</span>
                </div>
            </div>
            
            <NeoButton className="w-full text-sm font-black uppercase">
                <span className="material-symbols-outlined text-lg">ios_share</span>
                Enviar Convite
            </NeoButton>
        </section>

        {/* Members List */}
        <section className="flex flex-col gap-2">
            <h3 className="text-lg font-black uppercase px-1 border-b-[3px] border-black inline-block w-fit">Membros</h3>
            <div className="flex flex-col gap-3">
                {/* Member 1 */}
                <NeoCard className="flex items-center gap-4 hover:translate-x-1 hover:shadow-none transition-all cursor-pointer" hoverEffect>
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-full border-[3px] border-black bg-retro-purple flex items-center justify-center text-white">
                            <span className="material-symbols-outlined font-black">person</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-retro-green border-2 border-black rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="font-black text-lg uppercase truncate">João Silva</p>
                            <span className="px-1.5 py-0.5 border-2 border-black bg-black text-white text-[10px] font-bold uppercase tracking-wider">ADMIN</span>
                        </div>
                        <p className="text-xs font-bold opacity-60 truncate">joao.silva@email.com</p>
                    </div>
                    <span className="material-symbols-outlined font-black">chevron_right</span>
                </NeoCard>
                
                {/* Member 2 */}
                <NeoCard className="flex items-center gap-4 hover:translate-x-1 hover:shadow-none transition-all cursor-pointer" hoverEffect>
                    <div className="relative shrink-0">
                         <div className="w-12 h-12 rounded-full border-[3px] border-black bg-white flex items-center justify-center">
                            <span className="material-symbols-outlined font-black">person_outline</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-retro-green border-2 border-black rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="font-black text-lg uppercase truncate">Maria Silva</p>
                            <span className="px-1.5 py-0.5 border-2 border-black bg-white text-[10px] font-bold uppercase tracking-wider">MEMBRO</span>
                        </div>
                        <p className="text-xs font-bold opacity-60 truncate">maria.silva@email.com</p>
                    </div>
                    <span className="material-symbols-outlined font-black">chevron_right</span>
                </NeoCard>
            </div>
        </section>

        {/* Financial Summary */}
        <section className="flex flex-col gap-2 mb-6">
            <div className="flex items-center justify-between px-1 border-b-[3px] border-black pb-1">
                <h3 className="text-lg font-black uppercase">Resumo por Pessoa</h3>
                <button className="text-retro-purple font-bold text-xs flex items-center gap-1 hover:underline decoration-2 underline-offset-2 uppercase">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    Ocultar
                </button>
            </div>
            
            <NeoCard className="flex flex-col gap-6 p-4">
                {/* Person 1 Stats */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 font-black uppercase">
                            <div className="w-6 h-6 rounded-full border-2 border-black bg-retro-purple"></div>
                            <span>João</span>
                        </div>
                        <span className="text-xs font-bold opacity-60 uppercase">62% dos gastos</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-4 w-full bg-white border-2 border-black overflow-hidden relative">
                        <div className="h-full bg-retro-purple border-r-2 border-black" style={{ width: '62%' }}></div>
                    </div>
                    {/* Details */}
                    <div className="flex items-center justify-between text-xs font-bold uppercase mt-1 gap-2">
                        <div className="flex flex-col flex-1 p-1 border-2 border-black bg-retro-green/20">
                            <span className="opacity-60">Receitas</span>
                            <span className="text-retro-green font-black">+ R$ 5.000</span>
                        </div>
                        <div className="flex flex-col flex-1 p-1 border-2 border-black bg-retro-red/20 text-right">
                            <span className="opacity-60">Despesas</span>
                            <span className="text-retro-red font-black">- R$ 3.200</span>
                        </div>
                    </div>
                </div>

                <div className="h-[3px] bg-black border-dashed"></div>

                {/* Person 2 Stats */}
                <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 font-black uppercase">
                            <div className="w-6 h-6 rounded-full border-2 border-black bg-white"></div>
                            <span>Maria</span>
                        </div>
                        <span className="text-xs font-bold opacity-60 uppercase">38% dos gastos</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-4 w-full bg-white border-2 border-black overflow-hidden relative">
                        <div className="h-full bg-black border-r-2 border-black opacity-20" style={{ width: '38%' }}></div>
                    </div>
                    {/* Details */}
                    <div className="flex items-center justify-between text-xs font-bold uppercase mt-1 gap-2">
                        <div className="flex flex-col flex-1 p-1 border-2 border-black bg-retro-green/20">
                            <span className="opacity-60">Receitas</span>
                            <span className="text-retro-green font-black">+ R$ 4.200</span>
                        </div>
                        <div className="flex flex-col flex-1 p-1 border-2 border-black bg-retro-red/20 text-right">
                            <span className="opacity-60">Despesas</span>
                            <span className="text-retro-red font-black">- R$ 1.950</span>
                        </div>
                    </div>
                </div>
            </NeoCard>
        </section>
    </NeoLayout>
  )
}
