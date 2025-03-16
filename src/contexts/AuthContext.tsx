import { useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Company } from '../types/database';
import { AuthContext } from './AuthContextDef';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to recover session from localStorage
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCompanyData(session.user);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === 'SIGNED_IN' && session?.user) {
        await fetchCompanyData(session.user);
      } else if (event === 'SIGNED_OUT') {
        setCompany(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCompanyData = async (user: User) => {
    try {
      const { data: companyData } = await supabase
        .from('companies')
        .select('*')
        .eq('id', user.user_metadata.company_id)
        .single();
      
      setCompany(companyData);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      return await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, companyName: string) => {
    try {
      setLoading(true);
      // Create user
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error || !user) throw error;

      // Create company
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert({ name: companyName })
        .select()
        .single();
      
      if (companyError) throw companyError;

      // Update user with company_id
      const { error: updateError } = await supabase
        .from('users')
        .update({ company_id: company.id })
        .eq('id', user.id);
      
      if (updateError) throw updateError;

      return { user, company };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log('Signing out...');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      
      // Clear all state after successful signout
      setSession(null);
      setUser(null);
      setCompany(null);
      
      console.log('Signed out successfully');
      return { error: null };
    } catch (error) {
      console.error('Error in signOut:', error);
      return { error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    company,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};