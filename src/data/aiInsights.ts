
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AIInsight } from '@/types/dashboard';
import { Tables } from '@/integrations/supabase/types';

export const getAIInsights = async (): Promise<AIInsight[]> => {
  const { data, error } = await supabase
    .from('ai_insights')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching AI insights:', error);
    toast.error("Failed to fetch AI insights", { description: error.message });
    throw error;
  }

  if (!data) {
    return [];
  }

  const insights: AIInsight[] = data.map((insight: Tables<'ai_insights'>) => ({
    id: insight.id,
    type: insight.type as AIInsight['type'],
    title: insight.title,
    description: insight.description ?? '',
    confidence: insight.confidence ?? 0,
    priority: insight.priority as AIInsight['priority'],
    actionable: insight.actionable,
    createdAt: insight.created_at,
  }));

  return insights;
};
