
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from '@supabase/supabase-js';

// Extraemos las variables de entorno de Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validación de seguridad: Si faltan las llaves, la app te avisará de inmediato
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Error: Faltan las variables de entorno de Supabase. Revisa tu archivo .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);