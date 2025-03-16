import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Prosthetist, ProsthetistType, ProsthetistSubtype } from '../types/database';
import { useAuth } from './useAuth';

export interface CreateProsthetistInput {
  name: string;
  type: ProsthetistType;
  subtype: ProsthetistSubtype;
  cnpj?: string;
  cpf?: string;
}

export interface UpdateProsthetistInput extends CreateProsthetistInput {
  id: string;
}

export const useProsthetists = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProsthetists = useCallback(async (search?: string) => {
    if (!user?.user_metadata.company_id) {
      throw new Error('Invalid session');
    }

    try {
      setIsLoading(true);
      setError(null);
      let query = supabase
        .from('prosthetists')
        .select('*')
        .eq('company_id', user.user_metadata.company_id)
        .order('name', { ascending: true });

      if (search) {
        query = query.or(`name.ilike.%${search}%,cnpj.ilike.%${search}%,cpf.ilike.%${search}%`);
      }

      const { data, error: queryError } = await query;
      if (queryError) throw queryError;
      return data as Prosthetist[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching prosthetists';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user?.user_metadata.company_id]);

  const createProsthetist = useCallback(async (input: CreateProsthetistInput) => {
    if (!user?.user_metadata.company_id) {
      throw new Error('Invalid session');
    }

    try {
      setError(null);
      const { data, error: createError } = await supabase
        .from('prosthetists')
        .insert([{
          ...input,
          company_id: user.user_metadata.company_id
        }])
        .select()
        .single();

      if (createError) throw createError;
      return data as Prosthetist;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error creating prosthetist';
      setError(message);
      throw err;
    }
  }, [user?.user_metadata.company_id]);

  const updateProsthetist = useCallback(async ({ id, ...input }: UpdateProsthetistInput) => {
    if (!user?.user_metadata.company_id) {
      throw new Error('Invalid session');
    }

    try {
      setError(null);
      const { data, error: updateError } = await supabase
        .from('prosthetists')
        .update(input)
        .eq('id', id)
        .eq('company_id', user.user_metadata.company_id)
        .select()
        .single();

      if (updateError) throw updateError;
      return data as Prosthetist;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating prosthetist';
      setError(message);
      throw err;
    }
  }, [user?.user_metadata.company_id]);

  const deleteProsthetist = useCallback(async (id: string) => {
    if (!user?.user_metadata.company_id) {
      throw new Error('Invalid session');
    }

    try {
      setError(null);
      const { error: deleteError } = await supabase
        .from('prosthetists')
        .delete()
        .eq('id', id)
        .eq('company_id', user.user_metadata.company_id);

      if (deleteError) throw deleteError;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting prosthetist';
      setError(message);
      throw err;
    }
  }, [user?.user_metadata.company_id]);

  return {
    isLoading,
    error,
    fetchProsthetists,
    createProsthetist,
    updateProsthetist,
    deleteProsthetist
  };
};