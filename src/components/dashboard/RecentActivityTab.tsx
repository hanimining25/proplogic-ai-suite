import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, TrendingUp, Users, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { mockActivities } from '@/data/mockDashboardData';
import { useQuery } from '@tanstack/react-query';
import { getRfps } from '@/data/rfps';
import { Skeleton } from '../ui/skeleton';

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'proposal_created':
      return <FileText className="h-4 w-4" />;
    case 'deadline_approaching':
      return <Clock className="h-4 w-4" />;
    case 'status_changed':
      return <TrendingUp className="h-4 w-4" />;
    case 'rfp_discovered':
      return <Users className="h-4 w-4" />;
    case 'ai_suggestion':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
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

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = now.getTime() - time.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
};

const RecentActivityTab = () => {
  const { data: rfps, isLoading: isLoadingRfps } = useQuery({
    queryKey: ['rfps'],
    queryFn: getRfps,
  });

  const recentRfps = (rfps ?? [])
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  const todayActivities = mockActivities.filter(activity => {
    const activityDate = new Date(activity.timestamp);
    const today = new Date();
    return activityDate.toDateString() === today.toDateString();
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'lost':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'submitted':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'in_progress':
        return <TrendingUp className="h-4 w-4 text-yellow-600" />;
      case 'new':
        return <FileText className="h-4 w-4 text-gray-600" />;
      case 'archived':
        return <FileText className="h-4 w-4 text-gray-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <p className="text-muted-foreground">Latest updates, changes, and system activities across your proposals and RFPs.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Latest system and user activities (mock data)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <Badge variant={getPriorityColor(activity.priority) as any} className="text-xs">
                        {activity.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Recent Proposals */}
        <Card>
          <CardHeader>
            <CardTitle>Recent RFP Updates</CardTitle>
            <CardDescription>Latest RFP updates and status changes</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingRfps ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
                </div>
            ) : (
                <div className="space-y-4">
                {recentRfps.length > 0 ? recentRfps.map((rfp) => (
                    <div key={rfp.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                    <div className="flex-shrink-0">
                        {getStatusIcon(rfp.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{rfp.title}</p>
                        <p className="text-sm text-muted-foreground">{rfp.client_name}</p>
                        <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="text-xs capitalize">
                            {rfp.status.replace(/_/g, ' ')}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                            Updated {formatTimeAgo(rfp.updated_at)}
                        </p>
                        </div>
                    </div>
                    </div>
                )) : <p className="text-muted-foreground text-center py-10">No recent RFP activity.</p>}
                </div>
            )}
            <Button variant="outline" className="w-full mt-4">
              View All RFPs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Summary</CardTitle>
          <CardDescription>Key activities and metrics for today (mock data)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{todayActivities.length}</div>
              <p className="text-sm text-muted-foreground">Activities</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <p className="text-sm text-muted-foreground">Proposals Created</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <p className="text-sm text-muted-foreground">Deadlines Approaching</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <p className="text-sm text-muted-foreground">AI Suggestions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            <Button variant="outline" size="sm">
              Create Proposal
            </Button>
            <Button variant="outline" size="sm">
              Upload RFP
            </Button>
            <Button variant="outline" size="sm">
              Review Deadlines
            </Button>
            <Button variant="outline" size="sm">
              Check AI Suggestions
            </Button>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              Schedule Meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivityTab;
