import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getPipelineStages } from '@/data/opportunities';
import { getProposals } from '@/data/proposals';
import { PipelineStage } from '@/types/dashboard';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { AlertTriangle } from 'lucide-react';

const chartConfig = {
  count: { label: "Count", color: "#3b82f6" },
  value: { label: "Value", color: "#22c55e" }
};

const PipelineOverviewTab = () => {
  const { data: pipelineStages, isLoading: isLoadingStages, isError: isErrorStages, error: errorStages } = useQuery<PipelineStage[]>({
    queryKey: ['pipelineStages'],
    queryFn: getPipelineStages,
  });

  const { data: proposals, isLoading: isLoadingProposals } = useQuery({
    queryKey: ['proposals'],
    queryFn: getProposals,
  });

  const isLoading = isLoadingStages || isLoadingProposals;
  const isError = isErrorStages;
  const error = errorStages;

  const summary = React.useMemo(() => {
    if (!pipelineStages || !proposals) {
      return { totalPipelineValue: 0, totalOpportunities: 0, avgDealSize: 0 };
    }
    const totalPipelineValue = pipelineStages.reduce((sum, stage) => sum + stage.value, 0);
    const totalOpportunities = pipelineStages.reduce((sum, stage) => sum + stage.count, 0);
    const avgDealSize = totalOpportunities > 0 ? totalPipelineValue / totalOpportunities : 0;
    return { totalPipelineValue, totalOpportunities, avgDealSize };
  }, [pipelineStages, proposals]);
  

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Pipeline Overview</h3>
        <p className="text-muted-foreground">Comprehensive view of sales pipeline performance and opportunity flow.</p>
      </div>
      
      {isError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error loading pipeline data</AlertTitle>
          <AlertDescription>{(error as Error)?.message}</AlertDescription>
        </Alert>
      )}

      {/* Pipeline Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-2/3" /> : <div className="text-2xl font-bold">${(summary.totalPipelineValue / 1000000).toFixed(1)}M</div>}
            <p className="text-xs text-muted-foreground">From active opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Opportunities</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-2/3" /> : <div className="text-2xl font-bold">{summary.totalOpportunities}</div>}
            <p className="text-xs text-muted-foreground">Across all stages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Deal Size</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-2/3" /> : <div className="text-2xl font-bold">${(summary.avgDealSize / 1000).toFixed(0)}k</div>}
            <p className="text-xs text-muted-foreground">From opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Sales Cycle</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-2/3" /> : <div className="text-2xl font-bold">N/A</div>}
            <p className="text-xs text-muted-foreground">Data not available</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pipeline Stages */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline by Stage</CardTitle>
            <CardDescription>Opportunities count and value</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              {isLoading ? <Skeleton className="h-full w-full"/> : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pipelineStages} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Stage Velocity */}
        <Card>
          <CardHeader>
            <CardTitle>Stage Velocity</CardTitle>
            <CardDescription>Average days spent in each stage</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
             <p className="text-muted-foreground text-center">Stage velocity data not available.</p>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Stage Conversion Rates</CardTitle>
          <CardDescription>Success rate between pipeline stages</CardDescription>
        </CardHeader>
        <CardContent className="h-[150px] flex items-center justify-center">
            <p className="text-muted-foreground text-center">Conversion rate data not available.</p>
        </CardContent>
      </Card>

      {/* Pipeline Health */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pipeline Health</CardTitle>
          </CardHeader>
          <CardContent className="h-[100px] flex items-center justify-center">
            <p className="text-muted-foreground text-center">Data not available.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Forecast Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="h-[100px] flex items-center justify-center">
            <p className="text-muted-foreground text-center">Data not available.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="h-[100px] flex items-center justify-center">
            <p className="text-muted-foreground text-center">Data not available.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PipelineOverviewTab;
