
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ClientHealth } from '@/types/crm';
import { Tables } from '@/integrations/supabase/types';

type ClientHealthFromDB = Tables<'client_health'> & {
  clients: { name: string } | null;
};

// This type will be what the component receives.
export type ClientHealthWithClientName = ClientHealth & { 
  clientName: string;
};

export const getClientHealthData = async (): Promise<ClientHealthWithClientName[]> => {
  const { data, error } = await supabase
    .from('client_health')
    .select('*, clients(name)');

  if (error) {
    console.error('Error fetching client health:', error);
    toast.error("Failed to fetch client health data", { description: error.message });
    throw error;
  }

  if (!data) {
    return [];
  }

  const healthData: ClientHealthWithClientName[] = (data as ClientHealthFromDB[]).map(dbHealth => ({
    clientId: dbHealth.client_id,
    clientName: dbHealth.clients?.name ?? 'Unknown',
    overallScore: dbHealth.overall_score ?? 0,
    engagementScore: dbHealth.engagement_score ?? 0,
    satisfactionScore: dbHealth.satisfaction_score ?? 0,
    revenueScore: dbHealth.revenue_score ?? 0,
    riskLevel: dbHealth.risk_level ?? 'medium',
    lastUpdated: dbHealth.last_updated ?? new Date().toISOString(),
    factors: (dbHealth.factors as ClientHealth['factors']) ?? [],
    recommendations: (dbHealth.recommendations as ClientHealth['recommendations']) ?? [],
  }));

  return healthData;
};
