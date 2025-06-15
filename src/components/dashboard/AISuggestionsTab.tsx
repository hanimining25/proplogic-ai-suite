import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, AlertTriangle, TrendingUp, Target, Bot, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAIInsights } from '@/data/aiInsights';
import { AIInsight } from '@/types/dashboard';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'opportunity':
      return <Lightbulb className="h-4 w-4 text-yellow-600" />;
    case 'risk':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'optimization':
      return <TrendingUp className="h-4 w-4 text-blue-600" />;
    case 'deadline':
      return <Clock className="h-4 w-4 text-orange-600" />;
    default:
      return <Bot className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'default';
    case 'low':
      return 'secondary';
    default:
      return 'default';
  }
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 90) return 'text-green-600';
  if (confidence >= 70) return 'text-yellow-600';
  return 'text-red-600';
};

const AISuggestionsTab = () => {
  const { data: insights, isLoading, isError, error } = useQuery<AIInsight[]>({
    queryKey: ['aiInsights'],
    queryFn: getAIInsights,
  });

  const aiMetrics = React.useMemo(() => {
    if (!insights) {
      return {
        totalSuggestions: 0,
        implemented: 0,
        pending: 0,
        avgConfidence: 0,
        successRate: 0,
      };
    }
    const totalSuggestions = insights.length;
    // These are examples, as we don't have implemented/pending status in the DB
    const implemented = Math.round(totalSuggestions * 0.75); 
    const pending = totalSuggestions - implemented;
    const avgConfidence = totalSuggestions > 0 
      ? insights.reduce((sum, i) => sum + i.confidence, 0) / totalSuggestions
      : 0;
    
    return {
      totalSuggestions,
      implemented,
      pending,
      avgConfidence: Math.round(avgConfidence),
      successRate: 92, // Example static value
    };
  }, [insights]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">AI Suggestions</h3>
        <p className="text-muted-foreground">Intelligent recommendations, risk alerts, and optimization suggestions powered by AI analysis.</p>
      </div>

      {/* AI Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suggestions</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{aiMetrics.totalSuggestions}</div>}
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implemented</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold text-green-600">{aiMetrics.implemented}</div>}
            <p className="text-xs text-muted-foreground">Actions taken</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold text-yellow-600">{aiMetrics.pending}</div>}
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold text-blue-600">{aiMetrics.avgConfidence}%</div>}
            <p className="text-xs text-muted-foreground">Prediction accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold text-green-600">{aiMetrics.successRate}%</div>}
            <p className="text-xs text-muted-foreground">Positive outcomes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* High Priority Insights */}
        <Card>
          <CardHeader>
            <CardTitle>High Priority Insights</CardTitle>
            <CardDescription>Critical recommendations requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
              </div>
            ) : isError ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error loading insights</AlertTitle>
                <AlertDescription>{(error as Error)?.message}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {insights && insights.length > 0 ? insights.map((insight) => (
                  <div key={insight.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <div className="flex-shrink-0 mt-1">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{insight.title}</p>
                        <Badge variant={getPriorityColor(insight.priority) as any} className="text-xs">
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">Confidence:</span>
                          <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                            {insight.confidence}%
                          </span>
                        </div>
                        {insight.actionable && (
                          <Button size="sm" variant="outline">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-muted-foreground text-center py-10">No AI insights available.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle>AI Capabilities</CardTitle>
            <CardDescription>Performance across different AI functions</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground text-center">Capability analysis not yet available.</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent AI Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent AI Actions</CardTitle>
          <CardDescription>AI-suggested improvements and their outcomes</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground text-center">No recent actions to display.</p>
        </CardContent>
      </Card>

      {/* AI Training & Settings */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Model Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Prediction Accuracy</span>
                <span className="font-medium">89.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">False Positives</span>
                <span className="font-medium">3.1%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Model Version</span>
                <span className="font-medium">v2.4.1</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Training Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Proposals Analyzed</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">RFPs Processed</span>
                <span className="font-medium">892</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Last Updated</span>
                <span className="font-medium">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Auto-suggestions</span>
                <span className="font-medium text-green-600">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Risk Alerts</span>
                <span className="font-medium text-green-600">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Learning Mode</span>
                <span className="font-medium text-blue-600">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AISuggestionsTab;
