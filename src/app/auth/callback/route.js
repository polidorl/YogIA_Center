import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    // Intercambia el código temporal por una sesión real
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirige al usuario al inicio (o a su perfil) tras confirmar
  return NextResponse.redirect(requestUrl.origin)
}