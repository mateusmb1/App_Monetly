'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
   const supabase = createClient();
   const router = useRouter();
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [loading, setLoading] = React.useState(false);

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
         email,
         password,
      });

      if (error) {
         alert('Erro ao entrar: ' + error.message);
         setLoading(false);
      } else {
         router.push('/dashboard');
      }
   };

   const handleGoogleLogin = async () => {
      const { error } = await supabase.auth.signInWithOAuth({
         provider: 'google',
         options: {
            redirectTo: `${window.location.origin}/auth/callback`,
         },
      });
      if (error) alert('Erro ao autenticar com Google: ' + error.message);
   };

   return (
      <div className="min-h-[calc(100vh-theme(spacing.16))] flex flex-col items-center justify-center p-4 bg-retro-bg font-sans text-black">
         {/* Main Container */}
         <main className="w-full max-w-sm flex flex-col items-center gap-6" data-purpose="login-form-container">
            {/* Header Section */}
            <header className="text-center w-full flex flex-col items-center gap-6">
               {/* Logo Video Intro */}
               <div className="w-full max-w-[280px] aspect-video bg-white border-[3px] border-black shadow-brutal overflow-hidden relative mb-2">
                  <video
                     autoPlay
                     muted
                     loop
                     playsInline
                     className="w-full h-full object-cover"
                  >
                     <source src="/assets/intro.mp4" type="video/mp4" />
                     Seu navegador não suporta vídeos.
                  </video>
                  <div className="absolute inset-0 border-[3px] border-black pointer-events-none"></div>
               </div>

               {/* Welcome Text */}
               <div className="space-y-1">
                  <h2 className="text-3xl font-black text-black leading-tight">Acesse sua conta</h2>
                  <p className="text-black font-semibold text-sm sm:text-base leading-snug">
                     Gerencie suas finanças com simplicidade.
                  </p>
               </div>
            </header>

            {/* Form Section */}
            <section className="w-full flex flex-col gap-4" data-purpose="login-inputs">
               {/* Email Input */}
               <div className="relative">
                  <input
                     aria-label="Endereço de e-mail"
                     className="w-full bg-retro-bg border-[3px] border-black shadow-brutal p-3 font-bold text-black placeholder-black outline-none focus:shadow-brutal-sm focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
                     placeholder="E-mail"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               {/* Password Input */}
               <div className="relative">
                  <input
                     aria-label="Senha"
                     className="w-full bg-retro-bg border-[3px] border-black shadow-brutal p-3 font-bold text-black placeholder-black outline-none focus:shadow-brutal-sm focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
                     placeholder="Senha"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               {/* Forgot Password Link */}
               <div className="flex justify-end w-full">
                  <Link className="text-black font-bold text-sm underline hover:no-underline decoration-2 underline-offset-2" href="#">
                     Esqueci minha senha
                  </Link>
               </div>
               {/* Submit Button */}
               <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-retro-purple text-white border-[3px] border-black shadow-brutal py-3 text-lg font-bold flex items-center justify-center gap-2 active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer disabled:opacity-50"
                  type="submit"
               >
                  {loading ? 'Entrando...' : 'Entrar'}
               </button>
            </section>

            {/* Divider Section */}
            <div className="w-full flex items-center justify-between gap-2 my-2">
               <div className="h-0.5 bg-black flex-grow"></div>
               <span className="text-black font-bold text-sm">ou continue com</span>
               <div className="h-0.5 bg-black flex-grow"></div>
            </div>

            {/* Social Login Section */}
            <section className="w-full space-y-3">
               {/* Google Button */}
               <button
                  onClick={handleGoogleLogin}
                  className="w-full bg-retro-bg text-black border-[3px] border-black shadow-brutal py-2.5 font-bold flex items-center justify-center gap-2 active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                  type="button"
               >
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-.968 3.074-2.688 4.254-1.223.837-2.77 1.258-4.12 1.258-3.414 0-6.183-2.766-6.183-6.18s2.768-6.182 6.183-6.182c1.47 0 2.83.477 3.91 1.507l3.07-3.07c-1.85-1.724-4.22-2.657-6.98-2.657-5.74 0-10.41 4.67-10.41 10.4 0 5.733 4.67 10.402 10.41 10.402 5.56 0 10.23-4.143 10.23-10.4 0-.66-.08-1.52-.16-2.16H12.24z"></path></svg>
                  <span>Continuar com Google</span>
               </button>
               {/* Apple Button */}
               <button
                  onClick={() => alert('Login com Apple em breve!')}
                  className="w-full bg-retro-bg text-black border-[3px] border-black shadow-brutal py-2.5 font-bold flex items-center justify-center gap-2 active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                  type="button"
               >
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.8 11.2c.02 2.76 2.42 3.68 2.44 3.69-.02.06-.38 1.3-1.26 2.58-.78 1.14-1.6 2.28-2.88 2.28-1.26 0-1.66-.74-3.1-.74-1.44 0-1.9.72-3.1.72-1.24 0-2.18-1.22-2.98-2.36-1.6-2.34-2.84-6.62-1.18-9.52.82-1.44 2.3-2.34 3.9-2.34 1.22 0 2.38.82 3.12.82.74 0 2.14-.98 3.6-.84.6.02 2.32.24 3.4 1.82-2.92 1.44-2.44 5.38-2.42 5.38zm-2.8-5.32c.66-.8 1.1-1.92 1-3.04-1 .04-2.18.66-2.88 1.48-.6.68-1.12 1.76-1 2.92 1.1.08 2.2-.62 2.88-1.36z"></path></svg>
                  <span>Continuar com Apple</span>
               </button>
               {/* Facebook Button */}
               <button
                  onClick={() => alert('Login com Facebook em breve!')}
                  className="w-full bg-retro-bg text-black border-[3px] border-black shadow-brutal py-2.5 font-bold flex items-center justify-center gap-2 active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                  type="button"
               >
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.79-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                  <span>Continuar com Facebook</span>
               </button>
            </section>

            {/* Footer Section */}
            <footer className="mt-4 text-center">
               <p className="text-black font-bold text-sm">
                  Ainda não tem conta?{' '}
                  <Link className="underline hover:no-underline decoration-2 underline-offset-2 font-bold" href="/onboarding">
                     Cadastre-se
                  </Link>
               </p>
            </footer>
         </main>
      </div>
   );
}
