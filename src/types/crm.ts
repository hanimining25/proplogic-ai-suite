import { Tables } from '@/integrations/supabase/types';

export type Client = Tables<'clients'>;
export type Contact = Tables<'contacts'>;
export type ClientActivity = Tables<'client_activities'>;
export type Opportunity = Tables<'opportunities'> & {
  clients: { name: string } | null;
};

// The interfaces below are for aggregated data views and don't map directly to a single table.
// We will keep them for now and adjust as needed when implementing those features.

export interface ClientHealth {
  clientId: string;
  overallScore: number;
  engagementScore: number;
  satisfactionScore: number;
  revenueScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
  factors: {
    name: string;
    score: number;
    impact: 'positive' | 'negative' | 'neutral';
  }[];
  recommendations: string[];
}

export interface ClientInsight {
  clientId: string;
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  engagement: {
    meetings: number;
    emails: number;
    calls: number;
    totalTouchpoints: number;
  };
  satisfaction: {
    score: number;
    trend: 'up' | 'down' | 'stable';
    lastSurvey: string;
  };
  opportunities: {
    active: number;
    totalValue: number;
    avgCloseTime: number;
  };
  risks: string[];
  strengths: string[];
}
