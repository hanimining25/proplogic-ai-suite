import { Client, Contact, ClientActivity, ClientHealth, Opportunity, ClientInsight } from '../types/crm';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    industry: 'Technology',
    website: 'https://techcorp.com',
    status: 'active',
    health_score: 85,
    annual_revenue: 2500000,
    employee_count: 150,
    location: 'San Francisco, CA',
    created_at: new Date('2023-01-15').toISOString(),
    last_contact_date: new Date('2024-05-20').toISOString(),
    tags: ['enterprise', 'tech', 'saas'],
    description: 'Leading software development company specializing in enterprise solutions.',
    logo_url: null,
    org_id: 'd1b2c3a4-e5f6-a7b8-c9d0-e1f2a3b4c5d6'
  },
  {
    id: '2',
    name: 'Global Manufacturing Inc',
    industry: 'Manufacturing',
    website: 'https://globalmanufacturing.com',
    status: 'active',
    health_score: 72,
    annual_revenue: 5000000,
    employee_count: 500,
    location: 'Detroit, MI',
    created_at: new Date('2022-08-10').toISOString(),
    last_contact_date: new Date('2024-05-18').toISOString(),
    tags: ['manufacturing', 'industrial', 'large-enterprise'],
    description: 'Major manufacturing company with operations worldwide.',
    logo_url: null,
    org_id: 'd1b2c3a4-e5f6-a7b8-c9d0-e1f2a3b4c5d6'
  },
  {
    id: '3',
    name: 'FinanceFlow Partners',
    industry: 'Financial Services',
    website: 'https://financeflow.com',
    status: 'prospect',
    health_score: 45,
    annual_revenue: 1200000,
    employee_count: 80,
    location: 'New York, NY',
    created_at: new Date('2024-03-01').toISOString(),
    last_contact_date: new Date('2024-05-15').toISOString(),
    tags: ['finance', 'mid-market', 'prospect'],
    description: 'Growing financial services firm focused on small business lending.',
    logo_url: null,
    org_id: 'd1b2c3a4-e5f6-a7b8-c9d0-e1f2a3b4c5d6'
  },
  {
    id: '4',
    name: 'HealthTech Innovations',
    industry: 'Healthcare',
    website: 'https://healthtech.com',
    status: 'active',
    health_score: 91,
    annual_revenue: 3200000,
    employee_count: 200,
    location: 'Boston, MA',
    created_at: new Date('2023-06-20').toISOString(),
    last_contact_date: new Date('2024-05-22').toISOString(),
    tags: ['healthcare', 'innovation', 'growing'],
    description: 'Healthcare technology company developing innovative patient care solutions.',
    logo_url: null,
    org_id: 'd1b2c3a4-e5f6-a7b8-c9d0-e1f2a3b4c5d6'
  },
  {
    id: '5',
    name: 'EduLearn Systems',
    industry: 'Education',
    website: 'https://edulearn.com',
    status: 'inactive',
    health_score: 32,
    annual_revenue: 800000,
    employee_count: 45,
    location: 'Austin, TX',
    created_at: new Date('2022-11-15').toISOString(),
    last_contact_date: new Date('2024-02-10').toISOString(),
    tags: ['education', 'small-business', 'at-risk'],
    description: 'Educational software company serving K-12 schools.',
    logo_url: null,
    org_id: 'd1b2c3a4-e5f6-a7b8-c9d0-e1f2a3b4c5d6'
  }
];

export const mockContacts: Contact[] = [
  {
    id: '1',
    client_id: '1',
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1-555-0101',
    title: 'CTO',
    department: 'Technology',
    role: 'primary',
    last_contact_date: new Date('2024-05-20').toISOString(),
    communication_preference: 'email',
    notes: 'Primary decision maker for technical purchases. Prefers detailed technical documentation.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    linkedin_url: null,
  },
  {
    id: '2',
    client_id: '1',
    first_name: 'Lisa',
    last_name: 'Anderson',
    email: 'lisa.anderson@techcorp.com',
    phone: '+1-555-0102',
    title: 'VP of Operations',
    department: 'Operations',
    role: 'stakeholder',
    last_contact_date: new Date('2024-05-18').toISOString(),
    communication_preference: 'phone',
    notes: 'Focuses on operational efficiency and cost management.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    linkedin_url: null,
  },
  {
    id: '3',
    client_id: '2',
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.johnson@globalmanufacturing.com',
    phone: '+1-555-0201',
    title: 'Chief Procurement Officer',
    department: 'Procurement',
    role: 'primary',
    last_contact_date: new Date('2024-05-18').toISOString(),
    communication_preference: 'in-person',
    notes: 'Handles all major vendor relationships. Values long-term partnerships.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    linkedin_url: null,
  },
  {
    id: '4',
    client_id: '3',
    first_name: 'Michael',
    last_name: 'Chen',
    email: 'michael.chen@financeflow.com',
    phone: '+1-555-0301',
    title: 'CEO',
    department: 'Executive',
    role: 'primary',
    last_contact_date: new Date('2024-05-15').toISOString(),
    communication_preference: 'email',
    notes: 'New prospect. Interested in our enterprise solutions but budget concerns.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    linkedin_url: null,
  },
  {
    id: '5',
    client_id: '4',
    first_name: 'Emily',
    last_name: 'Rodriguez',
    email: 'emily.rodriguez@healthtech.com',
    phone: '+1-555-0401',
    title: 'Chief Medical Officer',
    department: 'Medical',
    role: 'primary',
    last_contact_date: new Date('2024-05-22').toISOString(),
    communication_preference: 'phone',
    notes: 'Excellent relationship. Advocate for our solutions within the organization.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    linkedin_url: null,
  }
];

export const mockActivities: ClientActivity[] = [
  {
    id: '1',
    client_id: '1',
    type: 'meeting',
    title: 'Q2 Business Review',
    description: 'Quarterly review meeting to discuss performance and upcoming initiatives.',
    date: new Date('2024-05-20').toISOString(),
    team_member: 'Alice Cooper',
    contact_id: '1',
    outcome: 'Positive feedback on current implementation',
    next_steps: 'Schedule technical workshop for new features',
    tags: ['quarterly-review', 'strategic'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    client_id: '1',
    type: 'email',
    title: 'Technical Documentation Request',
    description: 'Client requested updated API documentation and integration guides.',
    date: new Date('2024-05-18').toISOString(),
    team_member: 'Bob Johnson',
    contact_id: '1',
    outcome: 'Documentation sent',
    next_steps: 'Follow up on implementation questions',
    tags: ['technical', 'documentation'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    client_id: '2',
    type: 'proposal',
    title: 'Manufacturing Optimization Proposal',
    description: 'Submitted proposal for new manufacturing optimization software.',
    date: new Date('2024-05-15').toISOString(),
    team_member: 'Carol Smith',
    contact_id: '3',
    outcome: 'Under review by procurement team',
    next_steps: 'Schedule follow-up call for questions',
    tags: ['proposal', 'manufacturing'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    client_id: '4',
    type: 'call',
    title: 'Product Demo Call',
    description: 'Conducted live demo of new patient management features.',
    date: new Date('2024-05-22').toISOString(),
    team_member: 'David Wilson',
    contact_id: '5',
    outcome: 'Very interested in new features',
    next_steps: 'Prepare custom implementation plan',
    tags: ['demo', 'healthcare'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    client_id: '3',
    type: 'meeting',
    title: 'Initial Discovery Meeting',
    description: 'First meeting to understand client needs and current challenges.',
    date: new Date('2024-05-10').toISOString(),
    team_member: 'Eva Martinez',
    contact_id: '4',
    outcome: 'Identified key pain points',
    next_steps: 'Prepare preliminary solution overview',
    tags: ['discovery', 'first-meeting'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
    lastUpdated: new Date('2024-05-20').toISOString(),
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
    lastUpdated: new Date('2024-05-18').toISOString(),
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
    client_id: '1',
    title: 'Enterprise Analytics Package',
    description: 'Upgrade to advanced analytics and reporting module.',
    value: 150000,
    stage: 'proposal',
    probability: 75,
    expected_close_date: new Date('2024-07-15').toISOString(),
    created_at: new Date('2024-04-01').toISOString(),
    updated_at: new Date('2024-05-20').toISOString(),
    team_member: 'Alice Cooper',
    tags: ['upsell', 'analytics'],
    notes: 'Client very interested, waiting for budget approval.'
  },
  {
    id: '2',
    client_id: '2',
    title: 'Multi-Site Deployment',
    description: 'Expand current solution to 5 additional manufacturing facilities.',
    value: 500000,
    stage: 'negotiation',
    probability: 85,
    expected_close_date: new Date('2024-08-30').toISOString(),
    created_at: new Date('2024-03-15').toISOString(),
    updated_at: new Date('2024-05-18').toISOString(),
    team_member: 'Carol Smith',
    tags: ['expansion', 'manufacturing'],
    notes: 'In final negotiations on pricing and implementation timeline.'
  },
  {
    id: '3',
    client_id: '3',
    title: 'Initial Platform License',
    description: 'First-time purchase of our core platform.',
    value: 80000,
    stage: 'discovery',
    probability: 40,
    expected_close_date: new Date('2024-09-30').toISOString(),
    created_at: new Date('2024-05-01').toISOString(),
    updated_at: new Date('2024-05-15').toISOString(),
    team_member: 'Eva Martinez',
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
