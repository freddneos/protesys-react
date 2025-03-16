import { useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { AuthContext } from '../contexts/AuthContext';
import type { Company } from '../types/database';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch company data for a user
  const fetchCompanyData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching company data:', error);
        return null;
      }

      return data as Company;
    } catch (error) {
      console.error('Failed to fetch company data:', error);
      return null;
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        // Get current session
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          
          // Fetch company data if user exists
          if (currentSession.user?.user_metadata?.company_id) {
            const companyData = await fetchCompanyData(currentSession.user.user_metadata.company_id);
            setCompany(companyData);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && newSession?.user?.user_metadata?.company_id) {
          const companyData = await fetchCompanyData(newSession.user.user_metadata.company_id);
          setCompany(companyData);
        }
        
        if (event === 'SIGNED_OUT') {
          setCompany(null);
        }
      }
    );
    
    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      return { error };
    } catch (error) {
      return { error: error as Error };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sign up with email, password, and company name
  const signUp = async (email: string, password: string, companyName: string) => {
    try {
      setIsLoading(true);
      
      // Step 1: Register user
      const { data: { user: newUser }, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { company_name: companyName }
        }
      });
      
      if (error || !newUser) {
        return { error: error || new Error('Failed to create user'), user: null };
      }
      
      // Step 2: Create company record
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({ name: companyName })
        .select()
        .single();
        
      if (companyError) {
        return { error: companyError, user: newUser };
      }
      
      // Step 3: Update user with company ID
      const { error: updateError } = await supabase.auth.updateUser({
        data: { company_id: companyData.id }
      });
      
      if (updateError) {
        return { error: updateError, user: newUser };
      }
      
      setCompany(companyData);
      return { error: null, user: newUser };
    } catch (error) {
      return { error: error as Error, user: null };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sign out
  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setCompany(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Context value
  const value = {
    session,
    user,
    company,
    isLoading,
    signIn,
    signOut,
    signUp
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};