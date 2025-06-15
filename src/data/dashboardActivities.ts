
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Activity } from '@/types/dashboard';
import { Tables } from '@/integrations/supabase/types';

export const getDashboardActivities = async (): Promise<Activity[]> => {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching dashboard activities:', error);
    toast.error("Failed to fetch dashboard activities", { description: error.message });
    throw error;
  }

  if (!data) {
    return [];
  }

  const activities: Activity[] = data.map((activity: Tables<'activities'>) => ({
    id: activity.id,
    type: activity.type as Activity['type'],
    title: activity.title,
    description: activity.description ?? '',
    timestamp: activity.timestamp,
    user: activity.user_name ?? 'System',
    priority: activity.priority,
  }));

  return activities;
};
