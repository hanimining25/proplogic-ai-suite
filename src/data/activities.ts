
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ClientActivity } from '@/types/crm';

export type ActivityWithDetails = ClientActivity & { 
  clients: { name: string } | null;
  contacts: { first_name: string, last_name: string } | null;
};

export const getClientActivities = async (): Promise<ActivityWithDetails[]> => {
  const { data, error } = await supabase
    .from('client_activities')
    .select('*, clients(name), contacts(first_name, last_name)')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching client activities:', error);
    toast.error("Failed to fetch client activities", { description: error.message });
    throw error;
  }
  
  return data as ActivityWithDetails[];
};
