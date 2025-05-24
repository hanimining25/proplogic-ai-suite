
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react';
import StatsCard from './StatsCard';
import { mockWinLossData } from '@/data/mockDashboardData';

const chartConfig = {
  wins: { label: "Wins", color: "#22c55e" },
  losses: { label: "Losses", color: "#ef4444" },
  winRate: { label: "Win Rate", color: "#3b82f6" },
  value: { label: "Value", color: "#8b5cf6" }
};

const WinLossTrendsTab = () => {
  const totalWins = mockWinLossData.reduce((sum, data) => sum + data.wins, 0);
  const totalLosses = mockWinLossData.reduce((sum, data) => sum + data.losses, 0);
  const totalValue = mockWinLossData.reduce((sum, data) => sum + data.value, 0);
  const overallWinRate = (totalWins / (totalWins + totalLosses)) * 100;
  
  const currentMonth = mockWinLossData[mockWinLossData.length - 1];
  const previousMonth = mockWinLossData[mockWinLossData.length - 2];
  const winRateChange = currentMonth.winRate - previousMonth.winRate;

  const competitorData = [
    { competitor: 'TechSolutions Inc.', winRate: 72, ourWinRate: 85, market: 'Enterprise' },
    { competitor: 'Global Consulting', winRate: 68, ourWinRate: 82, market: 'Healthcare' },
    { competitor: 'Innovation Partners', winRate: 75, ourWinRate: 78, market: 'Government' },
    { competitor: 'Digital Dynamics', winRate: 71, ourWinRate: 88, market: 'Education' }
  ];

  const segmentData = [
    { segment: 'Enterprise', wins: 15, losses: 3, winRate: 83.3, avgValue: 180000 },
    { segment: 'Healthcare', wins: 12, losses: 2, winRate: 85.7, avgValue: 220000 },
    { segment: 'Government', wins: 8, losses: 4, winRate: 66.7, avgValue: 350000 },
    { segment: 'Education', wins: 10, losses: 1, winRate: 90.9, avgValue: 95000 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Win/Loss Trends</h3>
        <p className="text-muted-foreground">Comprehensive analysis of proposal success rates, competitive performance, and market trends.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Overall Win Rate"
          value={`${overallWinRate.toFixed(1)}%`}
          description="All time average"
          icon={<Target className="h-4 w-4" />}
          trend={{ value: Math.round(winRateChange), isPositive: winRateChange > 0 }}
        />
        <StatsCard
          title="Total Wins"
          value={totalWins}
          description="Successful proposals"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${(totalValue / 1000000).toFixed(1)}M`}
          description="Won proposals"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 18, isPositive: true }}
        />
        <StatsCard
          title="Loss Rate"
          value={`${((totalLosses / (totalWins + totalLosses)) * 100).toFixed(1)}%`}
          description="Unsuccessful bids"
          icon={<TrendingDown className="h-4 w-4" />}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Win/Loss Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Win/Loss Trend</CardTitle>
            <CardDescription>Monthly wins vs losses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={mockWinLossData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="wins" fill="var(--color-wins)" />
                  <Bar dataKey="losses" fill="var(--color-losses)" />
                  <Line type="monotone" dataKey="winRate" stroke="var(--color-winRate)" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Win Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Win Rate Performance</CardTitle>
            <CardDescription>Success rate percentage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockWinLossData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="winRate" 
                    stroke="var(--color-winRate)" 
                    fill="var(--color-winRate)" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Segment Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Win Rate by Market Segment</CardTitle>
          <CardDescription>Performance breakdown across different market sectors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {segmentData.map((segment, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold">{segment.segment}</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Win Rate</span>
                    <span className="font-medium">{segment.winRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Wins/Losses</span>
                    <span className="font-medium">{segment.wins}/{segment.losses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Value</span>
                    <span className="font-medium">${(segment.avgValue / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Competitive Win Rates</CardTitle>
          <CardDescription>How we perform against key competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitorData.map((comp, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{comp.competitor}</h4>
                  <span className="text-sm text-muted-foreground">{comp.market}</span>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm">Their Win Rate</span>
                      <span className="font-medium">{comp.winRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${comp.winRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-sm">Our Win Rate</span>
                      <span className="font-medium">{comp.ourWinRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${comp.ourWinRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loss Analysis */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Loss Reasons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Price Too High</span>
                <span className="font-medium">32%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Late Submission</span>
                <span className="font-medium">18%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Missing Requirements</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Competitor Advantage</span>
                <span className="font-medium">25%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Win Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Best Value</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Technical Excellence</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Past Performance</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Innovation</span>
                <span className="font-medium">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Improvement Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Pricing Strategy</span>
                <span className="font-medium text-yellow-600">Review</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Time Management</span>
                <span className="font-medium text-green-600">Good</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Requirements Analysis</span>
                <span className="font-medium text-yellow-600">Improve</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Competitive Intelligence</span>
                <span className="font-medium text-green-600">Strong</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WinLossTrendsTab;
