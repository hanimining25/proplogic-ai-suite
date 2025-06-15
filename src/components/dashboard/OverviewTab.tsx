
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, FileText, Target } from 'lucide-react';
import StatsCard from './StatsCard';
import RFPStatusCard from './RFPStatusCard';
import { getRfps } from '@/data/rfps';
import RecentRFPs from './RecentRFPs';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertTriangle } from 'lucide-react';

const OverviewTab = () => {
  const { data: rfps, isLoading, isError, error } = useQuery({
    queryKey: ['rfps-dashboard'],
    queryFn: getRfps
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Overview & Strategic Intelligence</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error loading dashboard data</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  const totalProposals = rfps?.length ?? 0;

  const statusCounts = rfps?.reduce((acc, rfp) => {
    acc[rfp.status] = (acc[rfp.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) ?? {};
  
  const statusData = [
    { label: 'New', value: statusCounts['new'] || 0, color: '#3b82f6' },
    { label: 'In Progress', value: statusCounts['in_progress'] || 0, color: '#f59e0b' },
    { label: 'Submitted', value: statusCounts['submitted'] || 0, color: '#10b981' },
    { label: 'Won', value: statusCounts['won'] || 0, color: '#22c55e' },
    { label: 'Lost', value: statusCounts['lost'] || 0, color: '#ef4444' },
    { label: 'Archived', value: statusCounts['archived'] || 0, color: '#6b7280' },
  ];
  
  const completedRfpsCount = (statusCounts['won'] || 0) + (statusCounts['lost'] || 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Overview & Strategic Intelligence</h3>
      </div>
      
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total RFPs"
          value={totalProposals}
          description="Active and archived RFPs"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Value"
          value="N/A"
          description="Awaiting value data"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatsCard
          title="Win Rate"
          value={completedRfpsCount > 0 ? `${((statusCounts['won'] || 0) / completedRfpsCount * 100).toFixed(1)}%` : 'N/A'}
          description="Based on completed RFPs"
          icon={<Target className="h-4 w-4" />}
        />
        <StatsCard
          title="Avg. Value"
          value="N/A"
          description="Awaiting value data"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Proposal Status */}
        <RFPStatusCard
          title="RFP Status"
          total={totalProposals}
          items={statusData}
        />
         <Card>
          <CardHeader>
            <CardTitle>Win/Loss Trends</CardTitle>
            <CardDescription>Monthly performance overview</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground text-center">Historical data not yet available.<br />This chart will be populated as RFPs are completed.</p>
          </CardContent>
        </Card>
      </div>

      <RecentRFPs />

      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Overview</CardTitle>
          <CardDescription>RFPs by stage</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[150px]">
          <p className="text-muted-foreground text-center">Pipeline data not yet available.<br />This requires mapping RFP statuses to pipeline stages.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
