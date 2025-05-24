
import { Client, Contact, ClientActivity, ClientHealth, Opportunity, ClientInsight } from '../types/crm';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    industry: 'Technology',
    website: 'https://techcorp.com',
    status: 'active',
    healthScore: 85,
    revenue: 2500000,
    employees: 150,
    location: 'San Francisco, CA',
    createdAt: new Date('2023-01-15'),
    lastContact: new Date('2024-05-20'),
    primaryContact: 'John Smith',
    tags: ['enterprise', 'tech', 'saas'],
    description: 'Leading software development company specializing in enterprise solutions.'
  },
  {
    id: '2',
    name: 'Global Manufacturing Inc',
    industry: 'Manufacturing',
    website: 'https://globalmanufacturing.com',
    status: 'active',
    healthScore: 72,
    revenue: 5000000,
    employees: 500,
    location: 'Detroit, MI',
    createdAt: new Date('2022-08-10'),
    lastContact: new Date('2024-05-18'),
    primaryContact: 'Sarah Johnson',
    tags: ['manufacturing', 'industrial', 'large-enterprise'],
    description: 'Major manufacturing company with operations worldwide.'
  },
  {
    id: '3',
    name: 'FinanceFlow Partners',
    industry: 'Financial Services',
    website: 'https://financeflow.com',
    status: 'prospect',
    healthScore: 45,
    revenue: 1200000,
    employees: 80,
    location: 'New York, NY',
    createdAt: new Date('2024-03-01'),
    lastContact: new Date('2024-05-15'),
    primaryContact: 'Michael Chen',
    tags: ['finance', 'mid-market', 'prospect'],
    description: 'Growing financial services firm focused on small business lending.'
  },
  {
    id: '4',
    name: 'HealthTech Innovations',
    industry: 'Healthcare',
    website: 'https://healthtech.com',
    status: 'active',
    healthScore: 91,
    revenue: 3200000,
    employees: 200,
    location: 'Boston, MA',
    createdAt: new Date('2023-06-20'),
    lastContact: new Date('2024-05-22'),
    primaryContact: 'Dr. Emily Rodriguez',
    tags: ['healthcare', 'innovation', 'growing'],
    description: 'Healthcare technology company developing innovative patient care solutions.'
  },
  {
    id: '5',
    name: 'EduLearn Systems',
    industry: 'Education',
    website: 'https://edulearn.com',
    status: 'inactive',
    healthScore: 32,
    revenue: 800000,
    employees: 45,
    location: 'Austin, TX',
    createdAt: new Date('2022-11-15'),
    lastContact: new Date('2024-02-10'),
    primaryContact: 'David Wilson',
    tags: ['education', 'small-business', 'at-risk'],
    description: 'Educational software company serving K-12 schools.'
  }
];

export const mockContacts: Contact[] = [
  {
    id: '1',
    clientId: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1-555-0101',
    title: 'CTO',
    department: 'Technology',
    role: 'primary',
    lastContact: new Date('2024-05-20'),
    communicationPreference: 'email',
    notes: 'Primary decision maker for technical purchases. Prefers detailed technical documentation.'
  },
  {
    id: '2',
    clientId: '1',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@techcorp.com',
    phone: '+1-555-0102',
    title: 'VP of Operations',
    department: 'Operations',
    role: 'stakeholder',
    lastContact: new Date('2024-05-18'),
    communicationPreference: 'phone',
    notes: 'Focuses on operational efficiency and cost management.'
  },
  {
    id: '3',
    clientId: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@globalmanufacturing.com',
    phone: '+1-555-0201',
    title: 'Chief Procurement Officer',
    department: 'Procurement',
    role: 'primary',
    lastContact: new Date('2024-05-18'),
    communicationPreference: 'in-person',
    notes: 'Handles all major vendor relationships. Values long-term partnerships.'
  },
  {
    id: '4',
    clientId: '3',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@financeflow.com',
    phone: '+1-555-0301',
    title: 'CEO',
    department: 'Executive',
    role: 'primary',
    lastContact: new Date('2024-05-15'),
    communicationPreference: 'email',
    notes: 'New prospect. Interested in our enterprise solutions but budget concerns.'
  },
  {
    id: '5',
    clientId: '4',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@healthtech.com',
    phone: '+1-555-0401',
    title: 'Chief Medical Officer',
    department: 'Medical',
    role: 'primary',
    lastContact: new Date('2024-05-22'),
    communicationPreference: 'phone',
    notes: 'Excellent relationship. Advocate for our solutions within the organization.'
  }
];

export const mockActivities: ClientActivity[] = [
  {
    id: '1',
    clientId: '1',
    type: 'meeting',
    title: 'Q2 Business Review',
    description: 'Quarterly review meeting to discuss performance and upcoming initiatives.',
    date: new Date('2024-05-20'),
    teamMember: 'Alice Cooper',
    contactId: '1',
    outcome: 'Positive feedback on current implementation',
    nextSteps: 'Schedule technical workshop for new features',
    tags: ['quarterly-review', 'strategic']
  },
  {
    id: '2',
    clientId: '1',
    type: 'email',
    title: 'Technical Documentation Request',
    description: 'Client requested updated API documentation and integration guides.',
    date: new Date('2024-05-18'),
    teamMember: 'Bob Johnson',
    contactId: '1',
    outcome: 'Documentation sent',
    nextSteps: 'Follow up on implementation questions',
    tags: ['technical', 'documentation']
  },
  {
    id: '3',
    clientId: '2',
    type: 'proposal',
    title: 'Manufacturing Optimization Proposal',
    description: 'Submitted proposal for new manufacturing optimization software.',
    date: new Date('2024-05-15'),
    teamMember: 'Carol Smith',
    contactId: '3',
    outcome: 'Under review by procurement team',
    nextSteps: 'Schedule follow-up call for questions',
    tags: ['proposal', 'manufacturing']
  },
  {
    id: '4',
    clientId: '4',
    type: 'call',
    title: 'Product Demo Call',
    description: 'Conducted live demo of new patient management features.',
    date: new Date('2024-05-22'),
    teamMember: 'David Wilson',
    contactId: '5',
    outcome: 'Very interested in new features',
    nextSteps: 'Prepare custom implementation plan',
    tags: ['demo', 'healthcare']
  },
  {
    id: '5',
    clientId: '3',
    type: 'meeting',
    title: 'Initial Discovery Meeting',
    description: 'First meeting to understand client needs and current challenges.',
    date: new Date('2024-05-10'),
    teamMember: 'Eva Martinez',
    contactId: '4',
    outcome: 'Identified key pain points',
    nextSteps: 'Prepare preliminary solution overview',
    tags: ['discovery', 'first-meeting']
  }
];

export const mockClientHealth: ClientHealth[] = [
  {
    clientId: '1',
    overallScore: 85,
    engagementScore: 90,
    satisfactionScore: 88,
    revenueScore: 78,
    riskLevel: 'low',
    lastUpdated: new Date('2024-05-20'),
    factors: [
      { name: 'Regular Communication', score: 95, impact: 'positive' },
      { name: 'On-time Payments', score: 100, impact: 'positive' },
      { name: 'Feature Adoption', score: 75, impact: 'neutral' },
      { name: 'Support Tickets', score: 85, impact: 'positive' }
    ],
    recommendations: [
      'Increase feature adoption through targeted training',
      'Explore upsell opportunities in Q3'
    ]
  },
  {
    clientId: '2',
    overallScore: 72,
    engagementScore: 68,
    satisfactionScore: 75,
    revenueScore: 85,
    riskLevel: 'medium',
    lastUpdated: new Date('2024-05-18'),
    factors: [
      { name: 'Communication Frequency', score: 60, impact: 'negative' },
      { name: 'Revenue Growth', score: 90, impact: 'positive' },
      { name: 'Support Satisfaction', score: 70, impact: 'neutral' },
      { name: 'Contract Renewals', score: 80, impact: 'positive' }
    ],
    recommendations: [
      'Increase touchpoint frequency',
      'Address recent support concerns',
      'Schedule executive review meeting'
    ]
  }
];

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    clientId: '1',
    title: 'Enterprise Analytics Package',
    description: 'Upgrade to advanced analytics and reporting module.',
    value: 150000,
    stage: 'proposal',
    probability: 75,
    expectedCloseDate: new Date('2024-07-15'),
    createdAt: new Date('2024-04-01'),
    lastUpdated: new Date('2024-05-20'),
    teamMember: 'Alice Cooper',
    tags: ['upsell', 'analytics'],
    notes: 'Client very interested, waiting for budget approval.'
  },
  {
    id: '2',
    clientId: '2',
    title: 'Multi-Site Deployment',
    description: 'Expand current solution to 5 additional manufacturing facilities.',
    value: 500000,
    stage: 'negotiation',
    probability: 85,
    expectedCloseDate: new Date('2024-08-30'),
    createdAt: new Date('2024-03-15'),
    lastUpdated: new Date('2024-05-18'),
    teamMember: 'Carol Smith',
    tags: ['expansion', 'manufacturing'],
    notes: 'In final negotiations on pricing and implementation timeline.'
  },
  {
    id: '3',
    clientId: '3',
    title: 'Initial Platform License',
    description: 'First-time purchase of our core platform.',
    value: 80000,
    stage: 'discovery',
    probability: 40,
    expectedCloseDate: new Date('2024-09-30'),
    createdAt: new Date('2024-05-01'),
    lastUpdated: new Date('2024-05-15'),
    teamMember: 'Eva Martinez',
    tags: ['new-business', 'finance'],
    notes: 'Still in early stages, competing with two other vendors.'
  }
];

export const mockClientInsights: ClientInsight[] = [
  {
    clientId: '1',
    revenue: {
      current: 2500000,
      previous: 2200000,
      growth: 13.6
    },
    engagement: {
      meetings: 12,
      emails: 45,
      calls: 8,
      totalTouchpoints: 65
    },
    satisfaction: {
      score: 88,
      trend: 'up',
      lastSurvey: new Date('2024-04-15')
    },
    opportunities: {
      active: 2,
      totalValue: 650000,
      avgCloseTime: 45
    },
    risks: ['Potential budget cuts in Q4'],
    strengths: ['Strong technical team', 'Good payment history', 'High engagement']
  },
  {
    clientId: '2',
    revenue: {
      current: 5000000,
      previous: 4800000,
      growth: 4.2
    },
    engagement: {
      meetings: 8,
      emails: 28,
      calls: 5,
      totalTouchpoints: 41
    },
    satisfaction: {
      score: 75,
      trend: 'stable',
      lastSurvey: new Date('2024-03-20')
    },
    opportunities: {
      active: 1,
      totalValue: 500000,
      avgCloseTime: 60
    },
    risks: ['Reduced communication frequency', 'Procurement delays'],
    strengths: ['Large contract value', 'Multi-year agreement', 'Expansion potential']
  }
];
