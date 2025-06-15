
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { WinLossData } from '@/types/dashboard';
import { format, subMonths } from 'date-fns';

export const getWinLossData = async (): Promise<WinLossData[]> => {
  const sixMonthsAgo = subMonths(new Date(), 5);
  sixMonthsAgo.setDate(1);

  const { data, error } = await supabase
    .from('proposals')
    .select('status, updated_at, value')
    .in('status', ['won', 'lost'])
    .gte('updated_at', sixMonthsAgo.toISOString());

  if (error) {
    console.error('Error fetching win/loss data:', error);
    toast.error("Failed to fetch win/loss data", { description: error.message });
    throw error;
  }
  
  if (!data) {
    return [];
  }
  
  const monthlyData: { [key: string]: { wins: number; losses: number; value: number } } = {};
  
  for (let i = 5; i >= 0; i--) {
    const month = format(subMonths(new Date(), i), 'MMM');
    monthlyData[month] = { wins: 0, losses: 0, value: 0 };
  }

  data.forEach(item => {
    const month = format(new Date(item.updated_at), 'MMM');
    if (monthlyData[month]) {
        if (item.status === 'won') {
            monthlyData[month].wins += 1;
            monthlyData[month].value += item.value ?? 0;
        } else {
            monthlyData[month].losses += 1;
        }
    }
  });

  const winLossArray: WinLossData[] = Object.entries(monthlyData).map(([period, d]) => ({
    period,
    wins: d.wins,
    losses: d.losses,
    value: d.value,
    winRate: (d.wins + d.losses > 0) ? (d.wins / (d.wins + d.losses)) * 100 : 0,
  }));
  
  return winLossArray;
};
