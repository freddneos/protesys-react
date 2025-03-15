import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Company } from '../types/database';
import type { Session } from '@supabase/supabase-js';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
    setLoading(true);
    const result = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    const result = await supabase.auth.signOut();
    setLoading(false);
    return result;
  };

  const getSession = async () => {
    return supabase.auth.getSession();
  };

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  };

  return { 
    session,
    loading,
    signUp, 
    signIn, 
    signOut,
    getSession,
    getUser
  };
};