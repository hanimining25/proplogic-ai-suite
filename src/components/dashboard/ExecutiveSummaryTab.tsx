
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Percent, Calendar } from 'lucide-react';
import StatsCard from './StatsCard';
import { mockWinLossData, mockProposals } from '@/data/mockDashboardData';

const chartConfig = {
  value: { label: "Revenue", color: "#3b82f6" },
  winRate: { label: "Win Rate", color: "#22c55e" }
};

const ExecutiveSummaryTab = () => {
  const currentMonth = mockWinLossData[mockWinLossData.length - 1];
  const previousMonth = mockWinLossData[mockWinLossData.length - 2];
  const revenueGrowth = ((currentMonth.value - previousMonth.value) / previousMonth.value * 100);
  const winRateChange = currentMonth.winRate - previousMonth.winRate;

  const quarterlyData = [
    { quarter: 'Q1 2024', revenue: 2020000, proposals: 35, winRate: 78.2 },
    { quarter: 'Q2 2024', revenue: 2680000, proposals: 42, winRate: 82.1 },
    { quarter: 'Q3 2024', revenue: 3100000, proposals: 48, winRate: 85.4 },
    { quarter: 'Q4 2024', revenue: 3500000, proposals: 52, winRate: 87.2 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Executive Summary</h3>
        <p className="text-muted-foreground">High-level performance metrics and strategic insights for leadership review.</p>
      </div>

      {/* Executive KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Monthly Revenue"
          value={`$${(currentMonth.value / 1000000).toFixed(1)}M`}
          description="Current month"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: Math.round(revenueGrowth), isPositive: revenueGrowth > 0 }}
        />
        <StatsCard
          title="Win Rate"
          value={`${currentMonth.winRate.toFixed(1)}%`}
          description="Success rate"
          icon={<Percent className="h-4 w-4" />}
          trend={{ value: Math.round(winRateChange), isPositive: winRateChange > 0 }}
        />
        <StatsCard
          title="Active Proposals"
          value={mockProposals.filter(p => p.status !== 'won' && p.status !== 'lost').length}
          description="In pipeline"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Avg. Deal Size"
          value={`$${(currentMonth.value / (currentMonth.wins + currentMonth.losses) / 1000).toFixed(0)}k`}
          description="Per opportunity"
          icon={<Calendar className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Quarterly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--color-value)" 
                    fill="var(--color-value)" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Win Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Win Rate Performance</CardTitle>
            <CardDescription>Success rate over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="winRate" 
                    stroke="var(--color-winRate)" 
                    strokeWidth={3}
                    dot={{ fill: "var(--color-winRate)", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Insights */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Market Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Market Share</span>
                <span className="font-medium">12.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Competitive Wins</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Client Retention</span>
                <span className="font-medium">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Proposal Quality Score</span>
                <span className="font-medium">8.7/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Time to Proposal</span>
                <span className="font-medium">4.2 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Client Satisfaction</span>
                <span className="font-medium">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Growth Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Pipeline Growth</span>
                <span className="font-medium text-green-600">+23%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">New Opportunities</span>
                <span className="font-medium text-green-600">+18%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Team Productivity</span>
                <span className="font-medium text-green-600">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExecutiveSummaryTab;
