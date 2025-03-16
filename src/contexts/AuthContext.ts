import { createContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import type { Company } from '../types/database';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  company: Company | null;
  isLoading: boolean;
  authError: Error | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, companyName: string) => Promise<{ error: Error | null, user: User | null }>;
}

// Create context with default undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);