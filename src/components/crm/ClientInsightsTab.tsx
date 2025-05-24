
import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { mockClientInsights, mockClients } from '@/data/mockCRMData';

const ClientInsightsTab = () => {
  const insightsWithClients = mockClientInsights.map(insight => ({
    ...insight,
    clientName: mockClients.find(c => c.id === insight.clientId)?.name || 'Unknown'
  }));

  // Chart configurations
  const chartConfig = {
    revenue: { label: "Revenue", color: "#3b82f6" },
    growth: { label: "Growth", color: "#10b981" },
    engagement: { label: "Engagement", color: "#f59e0b" },
    satisfaction: { label: "Satisfaction", color: "#8b5cf6" }
  };

  // Revenue data for charts
  const revenueData = insightsWithClients.map(insight => ({
    name: insight.clientName,
    current: insight.revenue.current / 1000000, // Convert to millions
    previous: insight.revenue.previous / 1000000,
    growth: insight.revenue.growth
  }));

  // Engagement data
  const engagementData = insightsWithClients.map(insight => ({
    name: insight.clientName,
    meetings: insight.engagement.meetings,
    emails: insight.engagement.emails,
    calls: insight.engagement.calls,
    total: insight.engagement.totalTouchpoints
  }));

  // Satisfaction trends
  const satisfactionData = insightsWithClients.map(insight => ({
    name: insight.clientName,
    score: insight.satisfaction.score,
    trend: insight.satisfaction.trend
  }));

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4 rounded-full bg-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Overall stats
  const totalRevenue = insightsWithClients.reduce((sum, insight) => sum + insight.revenue.current, 0);
  const avgGrowth = insightsWithClients.reduce((sum, insight) => sum + insight.revenue.growth, 0) / insightsWithClients.length;
  const avgSatisfaction = insightsWithClients.reduce((sum, insight) => sum + insight.satisfaction.score, 0) / insightsWithClients.length;
  const totalOpportunities = insightsWithClients.reduce((sum, insight) => sum + insight.opportunities.totalValue, 0);

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">+{avgGrowth.toFixed(1)}%</div>
            <p className="text-sm text-muted-foreground">Avg Growth</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{avgSatisfaction.toFixed(0)}%</div>
            <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalOpportunities)}</div>
            <p className="text-sm text-muted-foreground">Pipeline Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="current" fill="#3b82f6" name="Current" />
                  <Bar dataKey="previous" fill="#94a3b8" name="Previous" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Engagement Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Touchpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="meetings" fill="#3b82f6" name="Meetings" />
                  <Bar dataKey="emails" fill="#f59e0b" name="Emails" />
                  <Bar dataKey="calls" fill="#10b981" name="Calls" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Client Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insightsWithClients.map((insight) => (
          <Card key={insight.clientId}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{insight.clientName}</span>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(insight.satisfaction.trend)}
                  <span className={`text-sm ${getTrendColor(insight.satisfaction.trend)}`}>
                    {insight.satisfaction.trend}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Revenue Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Current Revenue</span>
                  </div>
                  <div className="text-lg font-bold">{formatCurrency(insight.revenue.current)}</div>
                  <div className="text-sm text-green-600">
                    +{insight.revenue.growth.toFixed(1)}% growth
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Satisfaction</span>
                  </div>
                  <div className="text-lg font-bold">{insight.satisfaction.score}%</div>
                  <div className="text-sm text-muted-foreground">
                    Last survey: {formatDate(insight.satisfaction.lastSurvey)}
                  </div>
                </div>
              </div>

              {/* Engagement Summary */}
              <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-2">Engagement Summary</h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{insight.engagement.meetings}</div>
                    <div className="text-xs text-muted-foreground">Meetings</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-600">{insight.engagement.emails}</div>
                    <div className="text-xs text-muted-foreground">Emails</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{insight.engagement.calls}</div>
                    <div className="text-xs text-muted-foreground">Calls</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{insight.engagement.totalTouchpoints}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>

              {/* Opportunities */}
              <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-2">Active Opportunities</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold">{insight.opportunities.active}</div>
                    <div className="text-xs text-muted-foreground">Active</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{formatCurrency(insight.opportunities.totalValue)}</div>
                    <div className="text-xs text-muted-foreground">Value</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{insight.opportunities.avgCloseTime}d</div>
                    <div className="text-xs text-muted-foreground">Avg Close</div>
                  </div>
                </div>
              </div>

              {/* Risks and Strengths */}
              <div className="pt-2 border-t">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center space-x-1">
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                      <span>Risks</span>
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {insight.risks.map((risk, index) => (
                        <li key={index} className="flex items-start space-x-1">
                          <span className="text-red-600">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Strengths</span>
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {insight.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-1">
                          <span className="text-green-600">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientInsightsTab;
