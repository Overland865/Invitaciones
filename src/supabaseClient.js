import { createClient } from '@supabase/supabase-js';

// Vite usa import.meta.env para leer el archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://qpqocbhsyyovraozukfh.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_raX0JK7dhrFwhT2i6pVskw_EUmG0F0x";

// Creamos y exportamos la conexión lista para usarse en cualquier parte
export const supabase = createClient(supabaseUrl, supabaseKey);