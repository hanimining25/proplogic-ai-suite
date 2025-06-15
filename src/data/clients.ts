
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const getClients = async () => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching clients:', error);
    toast.error("Failed to fetch clients", { description: error.message });
    throw error;
  }

  return data;
};
