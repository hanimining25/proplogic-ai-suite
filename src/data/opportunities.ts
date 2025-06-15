
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Opportunity } from '@/types/crm';

export type OpportunityWithClient = Opportunity & { clients: { name: string } | null };

export const getOpportunities = async (): Promise<OpportunityWithClient[]> => {
  const { data, error } = await supabase
    .from('opportunities')
    .select('*, clients(name)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching opportunities:', error);
    toast.error("Failed to fetch opportunities", { description: error.message });
    throw error;
  }
  
  return data as OpportunityWithClient[];
};
