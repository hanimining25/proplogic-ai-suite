import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Bar, ComposedChart, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react';
import StatsCard from './StatsCard';
import { useQuery } from '@tanstack/react-query';
import { getWinLossData } from '@/data/winLoss';
import { WinLossData } from '@/types/dashboard';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { AlertTriangle } from 'lucide-react';

const chartConfig = {
  wins: { label: "Wins", color: "#22c55e" },
  losses: { label: "Losses", color: "#ef4444" },
  winRate: { label: "Win Rate", color: "#3b82f6" },
  value: { label: "Value", color: "#8b5cf6" }
};

const WinLossTrendsTab = () => {
  const { data: winLossData, isLoading, isError, error } = useQuery<WinLossData[]>({
    queryKey: ['winLossData'],
    queryFn: getWinLossData
  });

  const summary = React.useMemo(() => {
    if (!winLossData || winLossData.length === 0) {
      return { totalWins: 0, totalLosses: 0, totalValue: 0, overallWinRate: 0, winRateChange: 0 };
    }
    const totalWins = winLossData.reduce((sum, data) => sum + data.wins, 0);
    const totalLosses = winLossData.reduce((sum, data) => sum + data.losses, 0);
    const totalValue = winLossData.reduce((sum, data) => sum + data.value, 0);
    const overallWinRate = (totalWins + totalLosses > 0) ? (totalWins / (totalWins + totalLosses)) * 100 : 0;
    
    const currentMonth = winLossData[winLossData.length - 1];
    const previousMonth = winLossData.length > 1 ? winLossData[winLossData.length - 2] : { winRate: 0 };
    const winRateChange = currentMonth.winRate - previousMonth.winRate;

    return { totalWins, totalLosses, totalValue, overallWinRate, winRateChange };
  }, [winLossData]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Win/Loss Trends</h3>
        <p className="text-muted-foreground">Comprehensive analysis of proposal success rates, competitive performance, and market trends.</p>
      </div>

      {isError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error loading Win/Loss data</AlertTitle>
          <AlertDescription>{(error as Error)?.message}</AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            <Skeleton className="h-[108px] rounded-lg" />
            <Skeleton className="h-[108px] rounded-lg" />
            <Skeleton className="h-[108px] rounded-lg" />
            <Skeleton className="h-[108px] rounded-lg" />
          </>
        ) : (
          <>
            <StatsCard
              title="Overall Win Rate"
              value={`${summary.overallWinRate.toFixed(1)}%`}
              description="All time average"
              icon={<Target className="h-4 w-4" />}
              trend={{ value: Math.round(summary.winRateChange), isPositive: summary.winRateChange > 0 }}
            />
            <StatsCard
              title="Total Wins"
              value={summary.totalWins}
              description="Successful proposals"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <StatsCard
              title="Total Revenue"
              value={`$${(summary.totalValue / 1000000).toFixed(1)}M`}
              description="Won proposals"
              icon={<DollarSign className="h-4 w-4" />}
            />
            <StatsCard
              title="Loss Rate"
              value={`${(100 - summary.overallWinRate).toFixed(1)}%`}
              description="Unsuccessful bids"
              icon={<TrendingDown className="h-4 w-4" />}
            />
          </>
        )}
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
              {isLoading ? <Skeleton className="h-full w-full" /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={winLossData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="wins" fill="var(--color-wins)" />
                    <Bar dataKey="losses" fill="var(--color-losses)" />
                    <Line type="monotone" dataKey="winRate" stroke="var(--color-winRate)" strokeWidth={3} />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
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
              {isLoading ? <Skeleton className="h-full w-full" /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={winLossData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis domain={[0, 100]} />
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

      {/* Market Segment Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Win Rate by Market Segment</CardTitle>
          <CardDescription>Performance breakdown across different market sectors</CardDescription>
        </CardHeader>
        <CardContent className="h-[150px] flex items-center justify-center">
            <p className="text-muted-foreground text-center">Market segment analysis not yet available.</p>
        </CardContent>
      </Card>

      {/* Competitive Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Competitive Win Rates</CardTitle>
          <CardDescription>How we perform against key competitors</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground text-center">Competitive analysis not yet available.</p>
        </CardContent>
      </Card>

      {/* Loss Analysis */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Loss Reasons</CardTitle>
          </CardHeader>
          <CardContent className="h-[150px] flex items-center justify-center">
            <p className="text-muted-foreground text-center">Data not available.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Win Factors</CardTitle>
          </CardHeader>
          <CardContent className="h-[150px] flex items-center justify-center">
            <p className="text-muted-foreground text-center">Data not available.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Improvement Areas</CardTitle>
          </CardHeader>
          <CardContent className="h-[150px] flex items-center justify-center">
            <p className="text-muted-foreground text-center">Data not available.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WinLossTrendsTab;
