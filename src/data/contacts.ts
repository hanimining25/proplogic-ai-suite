
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Contact } from '@/types/crm';

export type ContactWithClient = Contact & { clients: { name: string } | null };

export const getContacts = async (): Promise<ContactWithClient[]> => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*, clients(name)')
    .order('last_name', { ascending: true });

  if (error) {
    console.error('Error fetching contacts:', error);
    toast.error("Failed to fetch contacts", { description: error.message });
    throw error;
  }

  return data as ContactWithClient[];
};
