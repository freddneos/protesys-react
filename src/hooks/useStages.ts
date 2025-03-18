import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Stage, CreateStageInput, UpdateStageInput } from '../types/database';
import { useAuth } from './useAuth';

export const useStages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchStages = useCallback(async (search?: string) => {
    if (!user?.user_metadata.company_id) {
      throw new Error('Invalid session');
    }

    try {
      setIsLoading(true);
      setError(null);
      let query = supabase
        .from('stages')
        .select('*')
        .eq('company_id', user.user_metadata.company_id)
        .order('name', { ascending: true });

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data, error: queryError } = await query;
      setIsLoading(false);
      if (queryError) throw queryError;
      return data as Stage[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching stages';
      setError(message);
      setIsLoading(false);
      throw err;
    }
  }, [user?.user_metadata.company_id]);

  const createStage = useCallback(async (input: CreateStageInput) => {
    if (!user?.user_metadata.company_id) {
      throw new Error('Invalid session');
    }

    try {
      setError(null);
      const { data, error: createError } = await supabase
        .from('stages')
        .insert([{
          ...input,
          company_id: user.user_metadata.company_id
        }])
        .select()
        .single();

      if (createError) throw createError;
      return data as Stage;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error creating stage';
      setError(message);
      throw err;
    }
  }, [user?.user_metadata.company_id]);

  const updateStage = useCallback(async ({ id, ...input }: UpdateStageInput) => {
    if (!user?.user_metadata.company_id) {
      throw new Error('Invalid session');
    }

    try {
      setError(null);
      const { data, error: updateError } = await supabase
        .from('stages')
        .update(input)
        .eq('id', id)
        .eq('company_id', user.user_metadata.company_id)
        .select()
        .single();

      if (updateError) throw updateError;
      return data as Stage;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating stage';
      setError(message);
      throw err;
    }
  }, [user?.user_metadata.company_id]);

  const deleteStage = useCallback(async (id: string) => {
    if (!user?.user_metadata.company_id) {
      throw new Error('Invalid session');
    }

    try {
      setError(null);
      const { error: deleteError } = await supabase
        .from('stages')
        .delete()
        .eq('id', id)
        .eq('company_id', user.user_metadata.company_id);

      if (deleteError) throw deleteError;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting stage';
      setError(message);
      throw err;
    }
  }, [user?.user_metadata.company_id]);

  return {
    isLoading,
    error,
    fetchStages,
    createStage,
    updateStage,
    deleteStage
  };
};