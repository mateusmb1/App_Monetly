'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AuthDebugPage() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [clientCookies, setClientCookies] = useState('');

    useEffect(() => {
        const supabase = createClient();
        setClientCookies(document.cookie);

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-10 font-mono">Loading session state...</div>;

    return (
        <div className="p-6 font-mono bg-black text-neo-lime min-h-screen">
            <h1 className="text-2xl font-black mb-6 uppercase border-b-4 border-neo-lime pb-2">Auth Debug Tool</h1>

            <section className="mb-8">
                <h2 className="text-lg font-bold mb-2 uppercase text-white">1. Session Object</h2>
                <div className="bg-zinc-900 p-4 border-2 border-neo-lime overflow-auto max-h-[400px]">
                    <pre>{JSON.stringify(session, null, 2) || 'NO SESSION DETECTED'}</pre>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-lg font-bold mb-2 uppercase text-white">2. Raw Cookies</h2>
                <div className="bg-zinc-900 p-4 border-2 border-neo-lime break-all">
                    {clientCookies || 'NO COOKIES DETECTED'}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-lg font-bold mb-2 uppercase text-white">3. Tips</h2>
                <ul className="list-disc list-inside space-y-2 text-white">
                    <li>Se "Session Object" estiver null mas você acabou de logar, o cookie não foi persistido.</li>
                    <li>Verifique se o cookie do Supabase (sb-...) está na lista acima.</li>
                </ul>
            </section>

            <button
                onClick={() => window.location.href = '/login'}
                className="bg-neo-lime text-black px-6 py-3 font-black uppercase shadow-brutal active:translate-y-1 active:shadow-none"
            >
                Voltar para Login
            </button>
        </div>
    );
}
