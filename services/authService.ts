import { supabase } from './supabaseClient';
import { memberService } from './memberService';

export const authService = {
  async signIn(email: string, password: string) {
    const { data: { session, user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // 1. Tentar pegar o perfil do metadata (Cache)
    let profile = user?.user_metadata?.profile;

    // 2. Se não estiver no cache, buscar no banco (apenas na primeira vez ou após limpeza)
    if (!profile) {
      console.log('Cache miss: buscando perfil no banco de dados...');
      profile = await memberService.getByEmail(email);
      
      if (profile) {
        // 3. Salvar no metadata para o próximo acesso ser instantâneo
        await supabase.auth.updateUser({
          data: { profile }
        });
      }
    }

    return { session, user, profile };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    
    if (session?.user) {
      // Prioridade absoluta para o cache no metadata
      const profile = session.user.user_metadata?.profile;
      
      // Se não houver perfil em cache, fazemos o fallback (ocorre apenas 1 vez por usuário)
      if (!profile && session.user.email) {
          const freshProfile = await memberService.getByEmail(session.user.email);
          if (freshProfile) {
              await supabase.auth.updateUser({ data: { profile: freshProfile } });
              return { session, user: session.user, profile: freshProfile };
          }
      }

      return {
        session,
        user: session.user,
        profile
      };
    }
    
    return null;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};
