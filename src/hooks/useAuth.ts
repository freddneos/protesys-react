import { useState, useEffect, useCallback, useContext } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Company } from '../types/database';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';

// Export the function so it can be used
export function useCreateAuthState() {
  console.log('1. Creating auth state');
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  
  const resetAuth = useCallback(async () => {
    console.log('25. Resetting auth state');
    try {
      await supabase.auth.signOut();
      console.log('26. Supabase sign out successful');
    } finally {
      setSession(null);
      setUser(null);
      setCompany(null);
      localStorage.clear();
      console.log('27. Auth state reset complete');
    }
  }, []);

  const fetchCompanyData = useCallback(async (user: User) => {
    console.log('11. Fetching company data for user');
    try {
      const { data: companyData, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', user.user_metadata.company_id)
        .single();

      if (error) throw error;
      console.log('12. Company data fetched successfully');
      setCompany(companyData);
      return true;
    } catch (error) {
      console.log('13. Error fetching company data:', error);
      console.error('Error fetching company data:', error);
      await resetAuth();
      return false;
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, [resetAuth]);

  const handleAuthChange = useCallback(async (event: string, newSession: Session | null) => {
    console.log('8. Auth state changed:', event, newSession);
    
    try {
      if (event === 'SIGNED_IN' && newSession?.user) {
        // Update user state immediately
        setSession(newSession);
        setUser(newSession.user);
        setLoading(true); // Set loading when auth changes
        console.log('9. User signed in, user state updated, fetching company data');
        const success = await fetchCompanyData(newSession.user);
        
        // Ensure loading is set to false even if there's an error
        if (!success) {
          setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('10. User signed out, clearing data');
        setSession(null);
        setUser(null);
        setCompany(null);
        setLoading(false);
        setInitialized(true);
      }
    } catch (error) {
      console.error('Error handling auth change:', error);
      setLoading(false);
      setInitialized(true);
    }
  }, [fetchCompanyData]);

  useEffect(() => {
    let mounted = true;
    console.log('2. useAuth useEffect triggered');

    const initialize = async () => {
      try {
        console.log('4. Checking session');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        console.log('5. Session data:', data.session ? 'Session exists' : 'No session');
        
        if (!mounted) return;
        
        if (data.session?.user) {
          setSession(data.session);
          setUser(data.session.user);
          console.log('6. Session user found, fetching company data');
          await fetchCompanyData(data.session.user);
        } else {
          console.log('6a. No user session found, setting loading to false');
          setLoading(false);
          setInitialized(true);
        }
      } catch (error) {
        console.log('7. Error checking session:', error);
        console.error('Error checking session:', error);
        if (mounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    // Initialize auth state immediately
    initialize();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    // Set a safety timeout to ensure loading state is turned off
    const safetyTimer = setTimeout(() => {
      if (mounted && loading) {
        console.log('Timeout safety: forcing loading to false');
        setLoading(false);
        setInitialized(true);
      }
    }, 2000);

    return () => {
      console.log('3. Cleanup - unsubscribing from auth changes');
      mounted = false;
      clearTimeout(safetyTimer);
      subscription.unsubscribe();
    };
  }, [handleAuthChange, fetchCompanyData, loading]);

  const signIn = async (email: string, password: string) => {
    console.log('14. Attempting sign in');
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.log('16. Sign in error:', error);
        setLoading(false);
        throw error;
      }
      
      console.log('15. Sign in successful');
      
      if (data.user) {
        // Manually update state to avoid waiting for the auth change event
        setSession(data.session);
        setUser(data.user);
        
        // Try to fetch company data immediately
        try {
          await fetchCompanyData(data.user);
        } catch (e) {
          console.error('Error fetching company data during sign in:', e);
          setLoading(false);
          setInitialized(true);
        }
      } else {
        // If no user in response, reset loading state
        setLoading(false);
        setInitialized(true);
      }
      
      return { data, error: null };
    } catch (error: unknown) {
      console.log('16. Sign in error:', error);
      setLoading(false);
      setInitialized(true);
      return { data: null, error: error as AuthError };
    }
  };

  const signUp = async (email: string, password: string, companyName: string) => {
    console.log('17. Starting sign up process');
    try {
      setLoading(true);
      // Create user
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error || !user) throw error;
      console.log('18. User created successfully');

      // Create company
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({ name: companyName })
        .select()
        .single();
      
      if (companyError) throw companyError;
      console.log('19. Company created successfully');

      // Update user with company_id
      const { error: updateError } = await supabase
        .from('users')
        .update({ company_id: companyData.id })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      console.log('20. User updated with company ID');

      return { user, company: companyData, error: null };
    } catch (error: unknown) {
      console.log('21. Sign up error:', error);
      setLoading(false);
      return { user: null, company: null, error: error as AuthError };
    }
  };

  const signOut = async () => {
    console.log('22. Starting sign out process');
    try {
      setLoading(true);
      await resetAuth();
      console.log('23. Sign out successful');
      return { error: null };
    } catch (err) {
      console.log('24. Sign out error:', err);
      setLoading(false);
      return { error: err as AuthError };
    }
  };

  const validateSession = async () => {
    console.log('28. Validating session');
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        console.log('29. Session invalid or error:', error);
        await resetAuth();
        return false;
      }
      
      console.log('30. Session valid for user:', data.session.user.email);
      return true;
    } catch (error) {
      console.log('31. Error validating session:', error);
      await resetAuth();
      return false;
    }
  };

  return {
    session,
    user,
    company,
    loading,
    initialized,
    signIn,
    signUp,
    signOut,
    validateSession,
    resetAuth
  };
}

// Custom hook to use the auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}