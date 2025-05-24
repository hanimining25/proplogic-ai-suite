
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, FunnelChart, Funnel, Cell } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';
import { mockPipelineStages, mockProposals } from '@/data/mockDashboardData';

const chartConfig = {
  count: { label: "Count", color: "#3b82f6" },
  value: { label: "Value", color: "#22c55e" }
};

const PipelineOverviewTab = () => {
  const totalPipelineValue = mockPipelineStages.reduce((sum, stage) => sum + stage.value, 0);
  const totalOpportunities = mockPipelineStages.reduce((sum, stage) => sum + stage.count, 0);
  
  const conversionRates = [
    { stage: 'Discovery → Qualification', rate: 67 },
    { stage: 'Qualification → Proposal', rate: 75 },
    { stage: 'Proposal → Negotiation', rate: 67 },
    { stage: 'Negotiation → Closing', rate: 50 }
  ];

  const velocityData = [
    { stage: 'Discovery', avgDays: 14, color: '#3b82f6' },
    { stage: 'Qualification', avgDays: 21, color: '#8b5cf6' },
    { stage: 'Proposal', avgDays: 28, color: '#06b6d4' },
    { stage: 'Negotiation', avgDays: 35, color: '#10b981' },
    { stage: 'Closing', avgDays: 14, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Pipeline Overview</h3>
        <p className="text-muted-foreground">Comprehensive view of sales pipeline performance and opportunity flow.</p>
      </div>

      {/* Pipeline Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalPipelineValue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Opportunities</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOpportunities}</div>
            <p className="text-xs text-muted-foreground">8 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Deal Size</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalPipelineValue / totalOpportunities / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground">+5% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Sales Cycle</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">112 days</div>
            <p className="text-xs text-muted-foreground">-3 days from avg</p>
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
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockPipelineStages} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Stage Velocity */}
        <Card>
          <CardHeader>
            <CardTitle>Stage Velocity</CardTitle>
            <CardDescription>Average days spent in each stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {velocityData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.stage}</span>
                    <span className="text-sm text-muted-foreground">{item.avgDays} days</span>
                  </div>
                  <Progress 
                    value={(item.avgDays / 35) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Stage Conversion Rates</CardTitle>
          <CardDescription>Success rate between pipeline stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {conversionRates.map((conversion, index) => (
              <div key={index} className="space-y-2">
                <div className="text-sm font-medium">{conversion.stage}</div>
                <div className="text-2xl font-bold">{conversion.rate}%</div>
                <Progress value={conversion.rate} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Health */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pipeline Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Quality Score</span>
                <span className="font-medium text-green-600">8.5/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Stage Distribution</span>
                <span className="font-medium">Balanced</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Risk Level</span>
                <span className="font-medium text-yellow-600">Medium</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Forecast Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">This Quarter</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Next Quarter</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Confidence Level</span>
                <span className="font-medium text-green-600">High</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Close Rate</span>
                <span className="font-medium">23%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pipeline Coverage</span>
                <span className="font-medium">3.2x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Growth Rate</span>
                <span className="font-medium text-green-600">+15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PipelineOverviewTab;
