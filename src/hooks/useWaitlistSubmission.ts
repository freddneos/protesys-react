import { v4 as uuidv4 } from 'uuid';

interface WaitlistFormData {
  name: string;
  email: string;
  whatsapp: string;
  clinicCount: string;
  state: string;
  source?: string;
}

interface SheetDBResponse {
  created: number;
  success: boolean;
}

export const useWaitlistSubmission = () => {
  const submitToWaitlist = async (data: WaitlistFormData) => {
    const API_URL = 'https://sheetdb.io/api/v1/epi8xvc23a0uc';
    const token = import.meta.env.VITE_FORM_TOKEN;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          data: [{
            id: uuidv4(),
            nome: data.name,
            telefone: data.whatsapp,
            email: data.email,
            quantas_clinicas: data.clinicCount,
            estado: data.state,
            data: new Date().toISOString(),
            origem: data.source ?? 'Landing Page',
          }]
        })
      });

      const result: SheetDBResponse = await response.json();

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      return result;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return { submitToWaitlist };
};