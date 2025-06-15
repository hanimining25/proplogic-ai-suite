
import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRfps } from '@/data/rfps';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, Percent, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import StatsCard from '@/components/dashboard/StatsCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AIRelevanceScore = () => {
  const { data: rfps, isLoading, isError, error } = useQuery({
    queryKey: ['rfps-relevance'],
    queryFn: getRfps,
  });

  const scoredRfps = useMemo(() => {
    if (!rfps) return [];
    return rfps
      .filter(rfp => rfp.relevance_score !== null && rfp.relevance_score !== undefined)
      .sort((a, b) => (b.relevance_score ?? 0) - (a.relevance_score ?? 0));
  }, [rfps]);

  const summaryStats = useMemo(() => {
    if (scoredRfps.length === 0) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
        count: 0
      };
    }

    const scores = scoredRfps.map(r => r.relevance_score as number);
    const average = scores.reduce((acc, score) => acc + score, 0) / scores.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    
    return {
      average: Math.round(average),
      highest,
      lowest,
      count: scoredRfps.length
    };
  }, [scoredRfps]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error fetching RFP data</AlertTitle>
        <AlertDescription>{(error as Error).message}</AlertDescription>
      </Alert>
    );
  }
  
  if (scoredRfps.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Relevance Score</CardTitle>
          <CardDescription>View AI-powered relevance scores for your RFPs.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center py-10 border rounded-lg">
          <Target className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Scored RFPs Found</h3>
          <p className="text-muted-foreground">Relevance scores will appear here once RFPs are processed by the AI.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Relevance Score Analysis</CardTitle>
          <CardDescription>
            An overview of AI-assessed relevance scores for your uploaded RFPs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Scored RFPs"
              value={summaryStats.count}
              description="Total RFPs with a relevance score"
              icon={<Target className="h-4 w-4" />}
            />
            <StatsCard
              title="Average Score"
              value={`${summaryStats.average}%`}
              description="Average relevance across all scored RFPs"
              icon={<Percent className="h-4 w-4" />}
            />
            <StatsCard
              title="Highest Score"
              value={`${summaryStats.highest}%`}
              description="Best relevance match found"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <StatsCard
              title="Lowest Score"
              value={`${summaryStats.lowest}%`}
              description="Lowest relevance match found"
              icon={<TrendingDown className="h-4 w-4" />}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Relevance Score Distribution</CardTitle>
          <CardDescription>
            Comparison of relevance scores across the top 15 RFPs.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] pr-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={scoredRfps.slice(0, 15)}
              margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="title" 
                tick={{ fontSize: 12 }} 
                interval={0} 
                angle={-45}
                textAnchor="end"
                height={100}
                tickFormatter={(value) => value.length > 20 ? `${value.substring(0, 20)}...` : value}
              />
              <YAxis unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))'
                }}
              />
              <Bar dataKey="relevance_score" fill="#16a34a" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="relevance_score" position="top" formatter={(value: number) => `${value}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Detailed Scores</CardTitle>
          <CardDescription>
            A full list of all RFPs with their AI relevance score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RFP Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Relevance Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoredRfps.map(rfp => (
                <TableRow key={rfp.id}>
                  <TableCell className="font-medium">{rfp.title}</TableCell>
                  <TableCell>{rfp.client_name ?? 'N/A'}</TableCell>
                  <TableCell className="text-right font-semibold">{rfp.relevance_score}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRelevanceScore;
