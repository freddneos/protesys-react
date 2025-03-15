import { createContext } from 'react';
import { Session, User, AuthError, AuthResponse } from '@supabase/supabase-js';
import type { Company } from '../types/database';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  company: Company | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, companyName: string) => Promise<{ user: User; company: Company }>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);