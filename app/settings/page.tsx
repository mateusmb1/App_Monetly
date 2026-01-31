import { NeoLayout } from "@/components/NeoLayout";
import { NeoCard } from "@/components/NeoCard";

export default function Settings() {
  return (
    <NeoLayout title="Configurações" showNav={false}>
       {/* Hero Security Icon */}
       <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-32 h-32 bg-retro-yellow border-[3px] border-black shadow-brutal flex items-center justify-center mb-6 rotate-2 hover:rotate-0 transition-transform">
             <span className="material-symbols-outlined text-6xl font-black">fingerprint</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Segurança</h1>
       </div>

       {/* Settings List */}
       <div className="flex flex-col gap-6">
          {/* Biometry Card */}
          <NeoCard className="flex items-center justify-between bg-white p-5" hoverEffect>
             <div className="flex items-center gap-4">
                <div className="bg-retro-yellow/20 border-2 border-black p-2 flex items-center justify-center">
                   <span className="material-symbols-outlined font-bold">face</span>
                </div>
                <p className="font-bold text-lg leading-tight uppercase">Usar Biometria</p>
             </div>
             <div className="shrink-0">
                <label className="relative flex h-8 w-14 cursor-pointer items-center border-[3px] border-black bg-white p-0.5 transition-colors">
                   <input defaultChecked className="invisible absolute peer" type="checkbox"/>
                   <div className="h-full w-6 bg-black peer-checked:translate-x-6 transition-transform"></div>
                </label>
             </div>
          </NeoCard>

          {/* Password Change Card */}
          <NeoCard className="flex items-center justify-between bg-white p-5 cursor-pointer" hoverEffect>
             <div className="flex items-center gap-4">
                <div className="bg-retro-purple/20 border-2 border-black p-2 flex items-center justify-center">
                   <span className="material-symbols-outlined font-bold">lock_reset</span>
                </div>
                <p className="font-bold text-lg leading-tight uppercase">Alterar Senha</p>
             </div>
             <div className="shrink-0">
                <span className="material-symbols-outlined font-black">chevron_right</span>
             </div>
          </NeoCard>

          {/* 2FA Card */}
          <NeoCard className="flex items-center justify-between bg-white p-5" hoverEffect>
             <div className="flex items-center gap-4">
                <div className="bg-retro-red/20 border-2 border-black p-2 flex items-center justify-center">
                   <span className="material-symbols-outlined font-bold">verified_user</span>
                </div>
                <p className="font-bold text-lg leading-tight uppercase">Dois Fatores (2FA)</p>
             </div>
             <div className="shrink-0">
                <label className="relative flex h-8 w-14 cursor-pointer items-center border-[3px] border-black bg-white p-0.5 transition-colors">
                   <input className="invisible absolute peer" type="checkbox"/>
                   <div className="h-full w-6 bg-black peer-checked:translate-x-6 transition-transform"></div>
                </label>
             </div>
          </NeoCard>

          {/* Devices Card */}
          <NeoCard className="flex items-center justify-between bg-white p-5 cursor-pointer" hoverEffect>
             <div className="flex items-center gap-4">
                <div className="bg-retro-cyan/20 border-2 border-black p-2 flex items-center justify-center">
                   <span className="material-symbols-outlined font-bold">devices</span>
                </div>
                <p className="font-bold text-lg leading-tight uppercase">Dispositivos</p>
             </div>
             <div className="shrink-0">
                <span className="material-symbols-outlined font-black">chevron_right</span>
             </div>
          </NeoCard>
       </div>

       {/* Footer Info */}
       <div className="mt-8 mb-4 bg-black text-white p-4 border-[3px] border-black shadow-brutal -rotate-1">
          <p className="text-xs font-bold uppercase tracking-widest text-center leading-relaxed">
             Seus dados são protegidos com criptografia de ponta a ponta e padrões bancários de segurança.
          </p>
       </div>
    </NeoLayout>
  )
}
