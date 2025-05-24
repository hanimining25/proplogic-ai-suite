
import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockClientHealth, mockClients } from '@/data/mockCRMData';

const ClientHealthTab = () => {
  const healthData = mockClientHealth.map(health => ({
    ...health,
    clientName: mockClients.find(c => c.id === health.clientId)?.name || 'Unknown'
  }));

  const overallStats = {
    avgHealth: Math.round(healthData.reduce((sum, h) => sum + h.overallScore, 0) / healthData.length),
    highRisk: healthData.filter(h => h.riskLevel === 'high').length,
    mediumRisk: healthData.filter(h => h.riskLevel === 'medium').length,
    lowRisk: healthData.filter(h => h.riskLevel === 'low').length
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (score >= 60) return <TrendingUp className="h-4 w-4 text-yellow-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{overallStats.avgHealth}%</div>
            <p className="text-sm text-muted-foreground">Average Health Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{overallStats.lowRisk}</div>
            <p className="text-sm text-muted-foreground">Low Risk</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{overallStats.mediumRisk}</div>
            <p className="text-sm text-muted-foreground">Medium Risk</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{overallStats.highRisk}</div>
            <p className="text-sm text-muted-foreground">High Risk</p>
          </CardContent>
        </Card>
      </div>

      {/* Client Health Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {healthData.map((health) => (
          <Card key={health.clientId}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{health.clientName}</CardTitle>
                <Badge className={getRiskColor(health.riskLevel)}>
                  {health.riskLevel} risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Overall Score */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Health</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-lg font-bold ${getScoreColor(health.overallScore)}`}>
                    {health.overallScore}%
                  </span>
                  {getScoreIcon(health.overallScore)}
                </div>
              </div>
              <Progress value={health.overallScore} className="h-2" />

              {/* Individual Scores */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Engagement</span>
                  </div>
                  <div className={`text-xl font-bold ${getScoreColor(health.engagementScore)}`}>
                    {health.engagementScore}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Satisfaction</span>
                  </div>
                  <div className={`text-xl font-bold ${getScoreColor(health.satisfactionScore)}`}>
                    {health.satisfactionScore}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Revenue</span>
                  </div>
                  <div className={`text-xl font-bold ${getScoreColor(health.revenueScore)}`}>
                    {health.revenueScore}%
                  </div>
                </div>
              </div>

              {/* Health Factors */}
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Health Factors</h4>
                <div className="space-y-2">
                  {health.factors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-2">
                        {factor.impact === 'positive' && <CheckCircle className="h-3 w-3 text-green-600" />}
                        {factor.impact === 'negative' && <AlertTriangle className="h-3 w-3 text-red-600" />}
                        {factor.impact === 'neutral' && <div className="h-3 w-3 rounded-full bg-gray-400" />}
                        <span>{factor.name}</span>
                      </span>
                      <span className={getScoreColor(factor.score)}>{factor.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              {health.recommendations.length > 0 && (
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {health.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientHealthTab;
