
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, AlertTriangle, TrendingUp, Target, Bot, CheckCircle, XCircle, Clock } from 'lucide-react';
import { mockAIInsights } from '@/data/mockDashboardData';

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
  const highPriorityInsights = mockAIInsights.filter(insight => insight.priority === 'high');
  const actionableInsights = mockAIInsights.filter(insight => insight.actionable);
  
  const aiMetrics = {
    totalSuggestions: 24,
    implemented: 18,
    pending: 6,
    avgConfidence: 84,
    successRate: 92
  };

  const recentActions = [
    { id: '1', action: 'Added healthcare case studies to proposal template', status: 'completed', impact: '+15% win rate improvement' },
    { id: '2', action: 'Adjusted pricing strategy for enterprise segment', status: 'pending', impact: 'Estimated +8% margin' },
    { id: '3', action: 'Enhanced technical section formatting', status: 'completed', impact: '+12% readability score' }
  ];

  const aiCapabilities = [
    { name: 'RFP Matching', accuracy: 92, description: 'Finds relevant opportunities' },
    { name: 'Risk Detection', accuracy: 87, description: 'Identifies potential issues' },
    { name: 'Content Optimization', accuracy: 89, description: 'Improves proposal quality' },
    { name: 'Deadline Monitoring', accuracy: 96, description: 'Tracks critical dates' }
  ];

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
            <div className="text-2xl font-bold">{aiMetrics.totalSuggestions}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implemented</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{aiMetrics.implemented}</div>
            <p className="text-xs text-muted-foreground">Actions taken</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{aiMetrics.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{aiMetrics.avgConfidence}%</div>
            <p className="text-xs text-muted-foreground">Prediction accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{aiMetrics.successRate}%</div>
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
            <div className="space-y-4">
              {mockAIInsights.map((insight) => (
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
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle>AI Capabilities</CardTitle>
            <CardDescription>Performance across different AI functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiCapabilities.map((capability, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{capability.name}</p>
                      <p className="text-xs text-muted-foreground">{capability.description}</p>
                    </div>
                    <span className="text-sm font-medium">{capability.accuracy}%</span>
                  </div>
                  <Progress value={capability.accuracy} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent AI Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent AI Actions</CardTitle>
          <CardDescription>AI-suggested improvements and their outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActions.map((action) => (
              <div key={action.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                <div className="flex-shrink-0">
                  {action.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{action.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant={action.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                      {action.status.charAt(0).toUpperCase() + action.status.slice(1)}
                    </Badge>
                    <span className="text-xs text-green-600">{action.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
