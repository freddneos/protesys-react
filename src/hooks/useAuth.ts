import { supabase } from '../lib/supabase';
import type { Company } from '../types/database';

export const useAuth = () => {
  const signUp = async (email: string, password: string, companyName: string) => {
    const { data: { user }, error } = await supabase.auth.signUp({ 
      email, 
      password 
    });

    if (error || !user) throw error;

    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert({ name: companyName })
      .select()
      .single();

    if (companyError) throw companyError;

    const { error: updateError } = await supabase
      .from('users')
      .update({ company_id: company.id })
      .eq('id', user.id);

    if (updateError) throw updateError;

    return { user, company: company as Company };
  };

  const signIn = async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  const getSession = async () => {
    return supabase.auth.getSession();
  };

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  };

  return { 
    signUp, 
    signIn, 
    signOut,
    getSession,
    getUser
  };
};