
export interface Client {
  id: string;
  name: string;
  industry: string;
  website?: string;
  logo?: string;
  status: 'active' | 'inactive' | 'prospect';
  healthScore: number;
  revenue: number;
  employees: number;
  location: string;
  createdAt: Date;
  lastContact: Date;
  primaryContact: string;
  tags: string[];
  description?: string;
}

export interface Contact {
  id: string;
  clientId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title: string;
  department: string;
  role: 'primary' | 'secondary' | 'stakeholder';
  linkedIn?: string;
  lastContact: Date;
  communicationPreference: 'email' | 'phone' | 'linkedin' | 'in-person';
  notes?: string;
}

export interface ClientActivity {
  id: string;
  clientId: string;
  type: 'meeting' | 'call' | 'email' | 'proposal' | 'contract' | 'note';
  title: string;
  description: string;
  date: Date;
  teamMember: string;
  contactId?: string;
  outcome?: string;
  nextSteps?: string;
  tags: string[];
}

export interface ClientHealth {
  clientId: string;
  overallScore: number;
  engagementScore: number;
  satisfactionScore: number;
  revenueScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: Date;
  factors: {
    name: string;
    score: number;
    impact: 'positive' | 'negative' | 'neutral';
  }[];
  recommendations: string[];
}

export interface Opportunity {
  id: string;
  clientId: string;
  title: string;
  description: string;
  value: number;
  stage: 'discovery' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: Date;
  createdAt: Date;
  lastUpdated: Date;
  teamMember: string;
  tags: string[];
  notes?: string;
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
    lastSurvey: Date;
  };
  opportunities: {
    active: number;
    totalValue: number;
    avgCloseTime: number;
  };
  risks: string[];
  strengths: string[];
}
