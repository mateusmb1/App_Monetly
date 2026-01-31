import React from 'react';
import Link from 'next/link';

export function NeoLayout({ children, title, showNav = true }: { children: React.ReactNode; title?: string, showNav?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-retro-bg border-x-[3px] border-black shadow-brutal">
      <header className="flex items-center justify-between p-4 border-b-[3px] border-black bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center justify-center w-10 h-10 border-[3px] border-black shadow-brutal-sm overflow-hidden bg-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
            <img src="/assets/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </Link>
          {title && <h1 className="font-black text-lg uppercase tracking-tight">{title}</h1>}
        </div>
        <Link href="/dashboard" className="font-black uppercase text-xl tracking-tighter hover:text-retro-purple transition-colors">
          <span className="material-symbols-outlined">home</span>
        </Link>
      </header>
      <main className="flex-1 p-6 flex flex-col gap-6">
        {children}
      </main>
      {showNav && (
        <nav className="border-t-[3px] border-black p-4 bg-white flex justify-around sticky bottom-0 z-10">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 font-bold text-xs uppercase hover:text-retro-purple transition-colors group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">grid_view</span>
            <span>Início</span>
          </Link>
          <Link href="/expenses/add" className="flex flex-col items-center gap-1 font-bold text-xs uppercase hover:text-retro-purple transition-colors group">
            <div className="bg-retro-purple text-white rounded-full p-1 border-2 border-black -mt-6 shadow-brutal-sm group-hover:shadow-none group-hover:translate-y-1 transition-all">
              <span className="material-symbols-outlined">add</span>
            </div>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 font-bold text-xs uppercase hover:text-retro-purple transition-colors group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">person</span>
            <span>Perfil</span>
          </Link>
        </nav>
      )}
    </div>
  );
}
