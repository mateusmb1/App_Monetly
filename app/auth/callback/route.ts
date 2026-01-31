import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in search params, use it as the redirect URL
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Create the response object first to ensure cookies are attached to the correct domain
            const response = NextResponse.redirect(`${origin}${next}`)
            return response
        }
    }

    // If there's an error or no code, go to login with error feedback
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
