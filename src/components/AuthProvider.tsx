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
  const [authError, setAuthError] = useState<Error | null>(null);

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
    let timeoutId: number;

    const initializeAuth = async () => {
      setIsLoading(true);
      setAuthError(null);

      // Set a timeout to prevent infinite loading
      timeoutId = window.setTimeout(() => {
        console.error('Auth initialization timed out');
        setIsLoading(false);
        setAuthError(new Error('Authentication timed out. Please try again.'));
      }, 6000); // 10 second timeout

      try {
        // Get current session
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();

        if (error) {
          setAuthError(error);
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
        setAuthError(error instanceof Error ? error : new Error('Unknown authentication error'));
      } finally {
        clearTimeout(timeoutId);
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);

        // Always ensure we're not in a perpetual loading state
        const handleAuthChange = async () => {
          try {
            setIsLoading(true);
            
            if (event === 'SIGNED_IN' && newSession?.user?.user_metadata?.company_id) {
              const companyData = await fetchCompanyData(newSession.user.user_metadata.company_id);
              setCompany(companyData);
            }

            if (event === 'SIGNED_OUT') {
              setCompany(null);
            }
          } catch (error) {
            console.error('Error during auth state change:', error);
          } finally {
            setIsLoading(false);
          }
        };

        handleAuthChange();
      }
    );

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setAuthError(error);
        return { error };
      }

      // If login is successful but we don't get a new session from the auth state change
      // We'll manually check for company data
      if (data.user?.user_metadata?.company_id) {
        const companyData = await fetchCompanyData(data.user.user_metadata.company_id);
        setCompany(companyData);
      }

      return { error: null };
    } catch (error) {
      setAuthError(error instanceof Error ? error : new Error('Unknown sign-in error'));
      return { error: error as Error };
    } finally {
      // Always make sure loading state is turned off
      setIsLoading(false);
    }
  };

  // Sign up with email, password, and company name
  const signUp = async (email: string, password: string, companyName: string) => {
    try {
      setIsLoading(true);
      setAuthError(null);

      // Step 1: Register user
      const { data: { user: newUser }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { company_name: companyName }
        }
      });

      if (error || !newUser) {
        setAuthError(error || new Error('Failed to create user'));
        return { error: error || new Error('Failed to create user'), user: null };
      }

      // Step 2: Create company record
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({ name: companyName })
        .select()
        .single();

      if (companyError) {
        setAuthError(companyError);
        return { error: companyError, user: newUser };
      }

      // Step 3: Update user with company ID
      const { error: updateError } = await supabase.auth.updateUser({
        data: { company_id: companyData.id }
      });

      if (updateError) {
        setAuthError(updateError);
        return { error: updateError, user: newUser };
      }

      setCompany(companyData);
      return { error: null, user: newUser };
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown sign-up error');
      setAuthError(err);
      return { error: err, user: null };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await supabase.auth.signOut();
      setCompany(null);
    } catch (error) {
      console.error('Error signing out:', error);
      setAuthError(error instanceof Error ? error : new Error('Unknown sign-out error'));
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
    authError,
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