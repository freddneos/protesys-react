import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Client, CreateClientInput, UpdateClientInput } from '../types/client';
import { useAuth } from './useAuthHook';

export const useClients = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchClients = useCallback(async (search?: string) => {
    if (!user?.user_metadata.company_id) {
      return [];
    }

    try {
      setIsLoading(true);
      setError(null);
      
      let query = supabase
        .from('clients')
        .select('*')
        .eq('company_id', user.user_metadata.company_id)
        .order('first_name', { ascending: true });

      if (search) {
        query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,cpf_cnpj.ilike.%${search}%`);
      }

      const { data, error: queryError } = await query;

      if (queryError) throw queryError;
      return data as Client[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar clientes';
      setError(message);
      console.error('Error fetching clients:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [user?.user_metadata.company_id]);

  const createClient = useCallback(async (input: CreateClientInput) => {
    if (!user?.user_metadata.company_id) {
      throw new Error('Sessão inválida');
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: createError } = await supabase
        .from('clients')
        .insert([{
          ...input,
          company_id: user.user_metadata.company_id
        }])
        .select()
        .single();

      if (createError) throw createError;
      return data as Client;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar cliente';
      setError(message);
      console.error('Error creating client:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user?.user_metadata.company_id]);

  const updateClient = useCallback(async (input: UpdateClientInput) => {
    if (!user?.user_metadata.company_id) {
      throw new Error('Sessão inválida');
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const { id, ...updateData } = input;
      const { data, error: updateError } = await supabase
        .from('clients')
        .update(updateData)
        .eq('id', id)
        .eq('company_id', user.user_metadata.company_id)
        .select()
        .single();

      if (updateError) throw updateError;
      return data as Client;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao atualizar cliente';
      setError(message);
      console.error('Error updating client:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user?.user_metadata.company_id]);

  const deleteClient = useCallback(async (id: string) => {
    if (!user?.user_metadata.company_id) {
      throw new Error('Sessão inválida');
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const { error: deleteError } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)
        .eq('company_id', user.user_metadata.company_id);

      if (deleteError) throw deleteError;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao excluir cliente';
      setError(message);
      console.error('Error deleting client:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user?.user_metadata.company_id]);

  return {
    isLoading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient
  };
};