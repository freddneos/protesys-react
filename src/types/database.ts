export interface Company {
  id: string;
  name: string;
  created_at: string;
}

export interface User {
  id: string;
  company_id: string;
  // other auth.users fields would go here
}

export type ProsthetistType = 'External' | 'Internal';
export type ProsthetistSubtype = 'Laboratory' | 'Freelance' | 'Internal';

export interface Prosthetist {
  id: string;
  company_id: string;
  type: ProsthetistType;
  subtype: ProsthetistSubtype;
  name: string;
  cnpj?: string;
  cpf?: string;
  created_at: string;
}

export interface Client {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  cpf_cnpj?: string;
  birth_date?: string;
  address?: string;
  created_at: string;
}

export type ProcessStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Process {
  id: string;
  company_id: string;
  prosthetist_id: string;
  client_id: string;
  description?: string;
  start_date: string;
  status: ProcessStatus;
  created_at: string;
}

export interface Stage {
  id: string;
  company_id: string;
  name: string;
  description: string | null;
  min_days: number;
  max_days: number;
  color: string | null;
  created_at: string;
}

export type CreateStageInput = Omit<Stage, 'id' | 'company_id' | 'created_at'>;
export type UpdateStageInput = CreateStageInput & { id: string };

export interface ProcessStage {
  id: string;
  process_id: string;
  stage_id: string;
  start_date: string;
  end_date?: string;
  status: ProcessStatus;
  observations?: string;
  created_at: string;
}