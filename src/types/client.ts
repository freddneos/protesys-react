export interface Client {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  cpf_cnpj: string | null;
  birth_date: string | null;
  address: string | null;
  created_at: string;
}

export interface CreateClientInput {
  first_name: string;
  last_name: string;
  phone?: string;
  cpf_cnpj?: string;
  birth_date?: string;
  address?: string;
}

export interface UpdateClientInput extends Partial<CreateClientInput> {
  id: string;
}