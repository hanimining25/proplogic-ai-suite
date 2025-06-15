
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Opportunity } from '@/types/crm';
import { PipelineStage } from '@/types/dashboard';

export const getOpportunities = async (): Promise<Opportunity[]> => {
  const { data, error } = await supabase
    .from('opportunities')
    .select(`
      *,
      clients ( name )
    `);

  if (error) {
    console.error('Error fetching opportunities:', error);
    toast.error("Failed to fetch opportunities", { description: error.message });
    throw error;
  }

  if (!data) {
    return [];
  }

  return data.map(o => ({ ...o, value: o.value ?? 0, probability: o.probability ?? 0, expected_close_date: o.expected_close_date ?? new Date().toISOString() })) as Opportunity[];
}

const STAGE_COLORS: { [key: string]: string } = {
  discovery: '#3b82f6',
  qualification: '#8b5cf6',
  proposal: '#06b6d4',
  negotiation: '#10b981',
  closing: '#f59e0b',
  won: '#22c55e',
  lost: '#ef4444',
};

export const getPipelineStages = async (): Promise<PipelineStage[]> => {
  try {
    const opportunities = await getOpportunities();

    if (!opportunities || opportunities.length === 0) {
      return [];
    }

    const stages: { [key: string]: { count: number; value: number } } = {};

    opportunities.forEach(opp => {
      const stage = opp.stage;
      if (!stages[stage]) {
        stages[stage] = { count: 0, value: 0 };
      }
      stages[stage].count += 1;
      stages[stage].value += opp.value ?? 0;
    });

    return Object.entries(stages).map(([name, { count, value }]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' '),
      count,
      value,
      color: STAGE_COLORS[name] || '#6b7280',
    }));
  } catch (error) {
    console.error("Failed to calculate pipeline stages:", error);
    return [];
  }
};
