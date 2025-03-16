import { useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Company } from '../types/database';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial session check
    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);
    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchCompanyData(session.user);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error checking session:', error);
      setLoading(false);
    }
  };

  const handleAuthChange = async (event: string, session: Session | null) => {
    setSession(session);
    setUser(session?.user ?? null);

    if (event === 'SIGNED_IN' && session?.user) {
      await fetchCompanyData(session.user);
    } else if (event === 'SIGNED_OUT') {
      setCompany(null);
    }
  };

  const fetchCompanyData = async (user: User) => {
    try {
      const { data: companyData, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', user.user_metadata.company_id)
        .single();

      if (error) throw error;
      setCompany(companyData);
    } catch (error) {
      console.error('Error fetching company data:', error);
      await resetAuth();
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AuthError };
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
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({ name: companyName })
        .select()
        .single();
      
      if (companyError) throw companyError;

      // Update user with company_id
      const { error: updateError } = await supabase
        .from('users')
        .update({ company_id: companyData.id })
        .eq('id', user.id);
      
      if (updateError) throw updateError;

      return { user, company: companyData, error: null };
    } catch (error) {
      return { user: null, company: null, error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await resetAuth();
      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  const resetAuth = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      setSession(null);
      setUser(null);
      setCompany(null);
      localStorage.clear();
    }
  };

  const validateSession = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        await resetAuth();
        return false;
      }
      return true;
    } catch {
      await resetAuth();
      return false;
    }
  };

  return {
    session,
    user,
    company,
    loading,
    signIn,
    signUp,
    signOut,
    validateSession,
    resetAuth
  };
}