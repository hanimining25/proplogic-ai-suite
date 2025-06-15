import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, FileText, Users, Target, Clock } from 'lucide-react';
import StatsCard from './StatsCard';
import RFPStatusCard from './RFPStatusCard';
import { mockProposals, mockWinLossData, mockPipelineStages } from '@/data/mockDashboardData';
import RecentRFPs from './RecentRFPs';

const chartConfig = {
  wins: { label: "Wins", color: "#22c55e" },
  losses: { label: "Losses", color: "#ef4444" },
  value: { label: "Value", color: "#3b82f6" }
};

const OverviewTab = () => {
  const totalProposals = mockProposals.length;
  const totalValue = mockProposals.reduce((sum, p) => sum + p.value, 0);
  const avgValue = totalValue / totalProposals;
  const winRate = mockProposals.filter(p => p.status === 'won').length / totalProposals * 100;

  const statusData = [
    { label: 'Draft', value: mockProposals.filter(p => p.status === 'draft').length, color: '#6b7280' },
    { label: 'Submitted', value: mockProposals.filter(p => p.status === 'submitted').length, color: '#3b82f6' },
    { label: 'Won', value: mockProposals.filter(p => p.status === 'won').length, color: '#22c55e' },
    { label: 'Lost', value: mockProposals.filter(p => p.status === 'lost').length, color: '#ef4444' },
    { label: 'Pending', value: mockProposals.filter(p => p.status === 'pending').length, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Overview & Strategic Intelligence</h3>
      </div>
      
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Proposals"
          value={totalProposals}
          description="Active proposals"
          icon={<FileText className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Value"
          value={`$${(totalValue / 1000).toFixed(0)}k`}
          description="Pipeline value"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Win Rate"
          value={`${winRate.toFixed(1)}%`}
          description="Success rate"
          icon={<Target className="h-4 w-4" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Avg. Value"
          value={`$${(avgValue / 1000).toFixed(0)}k`}
          description="Per proposal"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Win/Loss Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Win/Loss Trends</CardTitle>
            <CardDescription>Monthly performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWinLossData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="wins" fill="var(--color-wins)" />
                  <Bar dataKey="losses" fill="var(--color-losses)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Proposal Status */}
        <RFPStatusCard
          title="Proposal Status"
          total={totalProposals}
          items={statusData}
        />
      </div>

      <RecentRFPs />

      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Overview</CardTitle>
          <CardDescription>Proposals by stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {mockPipelineStages.map((stage, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-full h-24 rounded-lg flex items-center justify-center text-white font-semibold mb-2"
                  style={{ backgroundColor: stage.color }}
                >
                  {stage.count}
                </div>
                <p className="text-sm font-medium">{stage.name}</p>
                <p className="text-xs text-muted-foreground">${(stage.value / 1000).toFixed(0)}k</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
