
import { Proposal, RFP, Activity, WinLossData, PipelineStage, AIInsight, Deadline } from '@/types/dashboard';

export const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Enterprise Software Implementation',
    client: 'TechCorp Inc.',
    value: 150000,
    status: 'submitted',
    probability: 75,
    deadline: '2024-06-15',
    createdAt: '2024-05-01',
    updatedAt: '2024-05-20',
    rfpId: 'rfp-1'
  },
  {
    id: '2',
    title: 'Cloud Migration Services',
    client: 'Global Industries',
    value: 280000,
    status: 'draft',
    probability: 45,
    deadline: '2024-06-30',
    createdAt: '2024-05-10',
    updatedAt: '2024-05-22'
  },
  {
    id: '3',
    title: 'Digital Transformation Project',
    client: 'Healthcare Systems',
    value: 320000,
    status: 'won',
    probability: 100,
    deadline: '2024-05-25',
    createdAt: '2024-04-15',
    updatedAt: '2024-05-25'
  },
  {
    id: '4',
    title: 'Data Analytics Platform',
    client: 'Finance Corp',
    value: 95000,
    status: 'pending',
    probability: 60,
    deadline: '2024-07-10',
    createdAt: '2024-05-15',
    updatedAt: '2024-05-23'
  }
];

export const mockRFPs: RFP[] = [
  {
    id: 'rfp-1',
    title: 'Municipal IT Infrastructure Upgrade',
    client: 'City of Springfield',
    deadline: '2024-06-20',
    status: 'open',
    relevanceScore: 92,
    estimatedValue: 450000,
    industry: 'Government',
    location: 'Springfield, USA'
  },
  {
    id: 'rfp-2',
    title: 'Educational Software Platform',
    client: 'State University',
    deadline: '2024-07-05',
    status: 'open',
    relevanceScore: 88,
    estimatedValue: 180000,
    industry: 'Education',
    location: 'Austin, TX'
  },
  {
    id: 'rfp-3',
    title: 'Supply Chain Management System',
    client: 'Manufacturing Ltd',
    deadline: '2024-06-10',
    status: 'closed',
    relevanceScore: 76,
    estimatedValue: 220000,
    industry: 'Manufacturing',
    location: 'Detroit, MI'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'proposal_created',
    title: 'New proposal created',
    description: 'Cloud Migration Services proposal created for Global Industries',
    timestamp: '2024-05-23T10:30:00Z',
    user: 'John Smith',
    priority: 'medium'
  },
  {
    id: '2',
    type: 'deadline_approaching',
    title: 'Deadline approaching',
    description: 'Enterprise Software Implementation proposal due in 3 days',
    timestamp: '2024-05-23T09:15:00Z',
    user: 'System',
    priority: 'high'
  },
  {
    id: '3',
    type: 'status_changed',
    title: 'Proposal status updated',
    description: 'Digital Transformation Project marked as won',
    timestamp: '2024-05-22T16:45:00Z',
    user: 'Sarah Johnson',
    priority: 'high'
  },
  {
    id: '4',
    type: 'rfp_discovered',
    title: 'New RFP discovered',
    description: 'Municipal IT Infrastructure Upgrade RFP found (92% relevance)',
    timestamp: '2024-05-22T14:20:00Z',
    user: 'AI Assistant',
    priority: 'medium'
  }
];

export const mockWinLossData: WinLossData[] = [
  { period: 'Jan', wins: 8, losses: 3, value: 450000, winRate: 72.7 },
  { period: 'Feb', wins: 12, losses: 4, value: 680000, winRate: 75.0 },
  { period: 'Mar', wins: 15, losses: 2, value: 890000, winRate: 88.2 },
  { period: 'Apr', wins: 10, losses: 5, value: 520000, winRate: 66.7 },
  { period: 'May', wins: 18, losses: 3, value: 1200000, winRate: 85.7 }
];

export const mockPipelineStages: PipelineStage[] = [
  { name: 'Discovery', count: 12, value: 340000, color: '#3b82f6' },
  { name: 'Qualification', count: 8, value: 280000, color: '#8b5cf6' },
  { name: 'Proposal', count: 6, value: 450000, color: '#06b6d4' },
  { name: 'Negotiation', count: 4, value: 320000, color: '#10b981' },
  { name: 'Closing', count: 2, value: 180000, color: '#f59e0b' }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'High-value RFP match detected',
    description: 'Municipal IT Infrastructure Upgrade RFP shows 92% relevance to your expertise. Estimated value: $450k',
    confidence: 92,
    priority: 'high',
    actionable: true,
    createdAt: '2024-05-23T08:00:00Z'
  },
  {
    id: '2',
    type: 'risk',
    title: 'Proposal deadline approaching',
    description: 'Enterprise Software Implementation proposal deadline is in 3 days. Current completion: 75%',
    confidence: 100,
    priority: 'high',
    actionable: true,
    createdAt: '2024-05-23T07:30:00Z'
  },
  {
    id: '3',
    type: 'optimization',
    title: 'Win rate improvement suggestion',
    description: 'Adding case studies from healthcare sector could improve proposal strength by 15%',
    confidence: 78,
    priority: 'medium',
    actionable: true,
    createdAt: '2024-05-22T16:00:00Z'
  }
];

export const mockDeadlines: Deadline[] = [
  {
    id: '1',
    title: 'Enterprise Software Implementation',
    type: 'proposal',
    dueDate: '2024-06-15T23:59:59Z',
    priority: 'high',
    status: 'pending',
    client: 'TechCorp Inc.'
  },
  {
    id: '2',
    title: 'Municipal IT Infrastructure RFP',
    type: 'rfp',
    dueDate: '2024-06-20T17:00:00Z',
    priority: 'high',
    status: 'pending',
    client: 'City of Springfield'
  },
  {
    id: '3',
    title: 'Client Review Meeting',
    type: 'meeting',
    dueDate: '2024-05-28T14:00:00Z',
    priority: 'medium',
    status: 'pending',
    client: 'Global Industries'
  },
  {
    id: '4',
    title: 'Proposal Quality Review',
    type: 'review',
    dueDate: '2024-05-30T12:00:00Z',
    priority: 'medium',
    status: 'pending',
    client: 'Healthcare Systems'
  }
];
