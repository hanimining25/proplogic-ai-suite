
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ClientInsight } from '@/types/crm';
import { Tables } from '@/integrations/supabase/types';

type ClientInsightFromDB = Tables<'client_insights'> & {
  clients: { name: string } | null;
};

// This type will be what the component receives.
export type ClientInsightWithClientName = ClientInsight & { 
  clientName: string;
  id: string; 
};

export const getClientInsights = async (): Promise<ClientInsightWithClientName[]> => {
  const { data, error } = await supabase
    .from('client_insights')
    .select('*, clients(name)');

  if (error) {
    console.error('Error fetching client insights:', error);
    toast.error("Failed to fetch client insights", { description: error.message });
    throw error;
  }

  if (!data) {
    return [];
  }

  // Supabase returns data that needs to be mapped to our application's DTOs/types.
  const insights: ClientInsightWithClientName[] = (data as ClientInsightFromDB[]).map(dbInsight => ({
    id: dbInsight.id,
    clientId: dbInsight.client_id,
    clientName: dbInsight.clients?.name ?? 'Unknown',
    // The JSONB columns from Supabase are parsed into objects. We cast them to our specific types.
    revenue: dbInsight.revenue as ClientInsight['revenue'],
    engagement: dbInsight.engagement as ClientInsight['engagement'],
    satisfaction: dbInsight.satisfaction as ClientInsight['satisfaction'],
    opportunities: dbInsight.opportunities as ClientInsight['opportunities'],
    risks: dbInsight.risks as ClientInsight['risks'],
    strengths: dbInsight.strengths as ClientInsight['strengths'],
  }));

  return insights;
};
