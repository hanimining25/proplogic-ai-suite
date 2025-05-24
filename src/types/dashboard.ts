
export interface Proposal {
  id: string;
  title: string;
  client: string;
  value: number;
  status: 'draft' | 'submitted' | 'won' | 'lost' | 'pending';
  probability: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  rfpId?: string;
}

export interface RFP {
  id: string;
  title: string;
  client: string;
  deadline: string;
  status: 'open' | 'closed' | 'draft' | 'submitted';
  relevanceScore: number;
  estimatedValue: number;
  industry: string;
  location: string;
}

export interface Activity {
  id: string;
  type: 'proposal_created' | 'rfp_discovered' | 'deadline_approaching' | 'status_changed' | 'ai_suggestion';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  priority: 'low' | 'medium' | 'high';
}

export interface WinLossData {
  period: string;
  wins: number;
  losses: number;
  value: number;
  winRate: number;
}

export interface PipelineStage {
  name: string;
  count: number;
  value: number;
  color: string;
}

export interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'optimization' | 'deadline';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  createdAt: string;
}

export interface Deadline {
  id: string;
  title: string;
  type: 'proposal' | 'rfp' | 'meeting' | 'review';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'overdue';
  client: string;
}
