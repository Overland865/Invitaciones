import { createClient } from '@supabase/supabase-js';

// Vite usa import.meta.env para leer el archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Creamos y exportamos la conexión lista para usarse en cualquier parte
export const supabase = createClient(supabaseUrl, supabaseKey);