
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { TrendingUp, DollarSign, Percent, Calendar } from 'lucide-react';
import StatsCard from './StatsCard';
import { useQuery } from '@tanstack/react-query';
import { getWinLossData } from '@/data/winLoss';
import { getProposals } from '@/data/proposals';
import { WinLossData, Proposal } from '@/types/dashboard';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { AlertTriangle } from 'lucide-react';

const chartConfig = {
  value: { label: "Revenue", color: "#3b82f6" },
  winRate: { label: "Win Rate", color: "#22c55e" }
};

const ExecutiveSummaryTab = () => {
  const { data: winLossData, isLoading: isLoadingWinLoss } = useQuery<WinLossData[]>({
    queryKey: ['winLossData'],
    queryFn: getWinLossData
  });
  
  const { data: proposals, isLoading: isLoadingProposals, isError, error } = useQuery<Proposal[]>({
    queryKey: ['proposals'],
    queryFn: getProposals
  });

  const isLoading = isLoadingWinLoss || isLoadingProposals;

  const summary = React.useMemo(() => {
    if (!winLossData || winLossData.length === 0 || !proposals) {
      return {
        currentMonth: { value: 0, winRate: 0, wins: 0, losses: 0 },
        revenueGrowth: 0,
        winRateChange: 0,
        activeProposals: 0,
        avgDealSize: 0,
      };
    }

    const currentMonth = winLossData[winLossData.length - 1];
    const previousMonth = winLossData.length > 1 ? winLossData[winLossData.length - 2] : { value: 0, winRate: 0 };
    const revenueGrowth = previousMonth.value > 0 ? ((currentMonth.value - previousMonth.value) / previousMonth.value * 100) : 0;
    const winRateChange = currentMonth.winRate - previousMonth.winRate;
    const activeProposals = proposals.filter(p => p.status !== 'won' && p.status !== 'lost').length;
    const totalDeals = currentMonth.wins + currentMonth.losses;
    const avgDealSize = totalDeals > 0 ? currentMonth.value / totalDeals : 0;
    
    return { currentMonth, revenueGrowth, winRateChange, activeProposals, avgDealSize };
  }, [winLossData, proposals]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Executive Summary</h3>
        <p className="text-muted-foreground">High-level performance metrics and strategic insights for leadership review.</p>
      </div>

      {isError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error loading summary data</AlertTitle>
          <AlertDescription>{(error as Error)?.message}</AlertDescription>
        </Alert>
      )}

      {/* Executive KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Monthly Revenue"
          value={isLoading ? <Skeleton className="h-8 w-2/3" /> : `$${(summary.currentMonth.value / 1000).toFixed(0)}k`}
          description="Current month"
          icon={<DollarSign className="h-4 w-4" />}
          trend={isLoading ? undefined : { value: Math.round(summary.revenueGrowth), isPositive: summary.revenueGrowth > 0 }}
        />
        <StatsCard
          title="Win Rate"
          value={isLoading ? <Skeleton className="h-8 w-2/3" /> : `${summary.currentMonth.winRate.toFixed(1)}%`}
          description="Success rate"
          icon={<Percent className="h-4 w-4" />}
          trend={isLoading ? undefined : { value: Math.round(summary.winRateChange), isPositive: summary.winRateChange > 0 }}
        />
        <StatsCard
          title="Active Proposals"
          value={isLoading ? <Skeleton className="h-8 w-2/3" /> : summary.activeProposals}
          description="In pipeline"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatsCard
          title="Avg. Deal Size"
          value={isLoading ? <Skeleton className="h-8 w-2/3" /> : `$${(summary.avgDealSize / 1000).toFixed(0)}k`}
          description="Per opportunity"
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              {isLoading ? <Skeleton className="h-full w-full" /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={winLossData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--color-value)" 
                      fill="var(--color-value)" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
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
              {isLoading ? <Skeleton className="h-full w-full" /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={winLossData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis domain={[0, 100]}/>
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
              )}
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Insights */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-lg">Market Position</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-center h-[100px]">
            <p className="text-muted-foreground text-center">Data not available.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Performance Metrics</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-center h-[100px]">
            <p className="text-muted-foreground text-center">Data not available.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Growth Indicators</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-center h-[100px]">
            <p className="text-muted-foreground text-center">Data not available.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExecutiveSummaryTab;
