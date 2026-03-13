import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Mantém sessão no localStorage — elimina round-trip ao iniciar
    persistSession: true,
    // Detecta a sessão atual automaticamente sem chamada extra à rede
    detectSessionInUrl: false,
    // Atualiza token em background sem bloquear a UI
    autoRefreshToken: true,
    // Armazenamento padrão: localStorage (mais rápido que sessionStorage)
    storageKey: 'ecclesia_auth',
  },
  global: {
    headers: {
      // Evitar overhead de preflight por desvio de CORS
      'X-Client-Info': 'ecclesia-web/1.0',
    },
  },
  // Configurações de realtime otimizadas — não conectar até ser necessário
  realtime: {
    timeout: 30000,
  },
});
