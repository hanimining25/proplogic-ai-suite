import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, AlertTriangle, Target, FileText, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getRfps } from '@/data/rfps';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

const getDaysUntilDeadline = (dueDate: string) => {
  const now = new Date();
  const deadline = new Date(dueDate);
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const formatDeadlineDate = (dueDate: string) => {
  const date = new Date(dueDate);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getUrgencyLevel = (daysUntil: number) => {
  if (daysUntil < 0) return { level: 'overdue', color: 'destructive' };
  if (daysUntil <= 3) return { level: 'critical', color: 'destructive' };
  if (daysUntil <= 7) return { level: 'urgent', color: 'default' };
  return { level: 'normal', color: 'secondary' };
};

const UpcomingDeadlinesTab = () => {
    const { data: rfps, isLoading, isError, error } = useQuery({
        queryKey: ['rfps'],
        queryFn: getRfps
    });

    if (isLoading) {
        return (
            <div className="space-y-6">
                 <h3 className="text-xl font-semibold mb-4">Upcoming Deadlines</h3>
                <div className="grid gap-4 md:grid-cols-4">
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-[450px]" />
                    <Skeleton className="h-[450px]" />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error loading deadlines</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
            </Alert>
        );
    }
  
  const deadlines = (rfps ?? []).filter(rfp => rfp.due_date);

  const sortedDeadlines = deadlines
    .map(deadline => ({
      ...deadline,
      daysUntil: getDaysUntilDeadline(deadline.due_date!)
    }))
    .sort((a, b) => a.daysUntil - b.daysUntil);

  const overdueDeadlines = sortedDeadlines.filter(d => d.daysUntil < 0);
  const upcomingDeadlines = sortedDeadlines.filter(d => d.daysUntil >= 0);
  const criticalDeadlines = upcomingDeadlines.filter(d => d.daysUntil <= 3);

  const weeklyView = [
    { day: 'Monday', date: '2024-05-27', deadlines: 2 },
    { day: 'Tuesday', date: '2024-05-28', deadlines: 1 },
    { day: 'Wednesday', date: '2024-05-29', deadlines: 0 },
    { day: 'Thursday', date: '2024-05-30', deadlines: 1 },
    { day: 'Friday', date: '2024-05-31', deadlines: 0 },
    { day: 'Saturday', date: '2024-06-01', deadlines: 0 },
    { day: 'Sunday', date: '2024-06-02', deadlines: 0 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Upcoming Deadlines</h3>
        <p className="text-muted-foreground">Track and manage all proposal deadlines, RFP submissions, and important milestones.</p>
      </div>

      {/* Deadline Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overdueDeadlines.length}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical (3 days)</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{criticalDeadlines.length}</div>
            <p className="text-xs text-muted-foreground">Due within 3 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {upcomingDeadlines.filter(d => d.daysUntil <= 7).length}
            </div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total with Deadlines</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{deadlines.length}</div>
            <p className="text-xs text-muted-foreground">All active deadlines</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Priority Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Deadlines</CardTitle>
            <CardDescription>Most urgent items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedDeadlines.length > 0 ? sortedDeadlines.slice(0, 5).map((deadline) => {
                const urgency = getUrgencyLevel(deadline.daysUntil);
                return (
                  <div key={deadline.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                    <div className="flex-shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{deadline.title}</p>
                        <Badge variant={urgency.color as any} className="text-xs">
                          {deadline.daysUntil < 0 ? 'Overdue' : `${deadline.daysUntil}d`}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{deadline.client_name || 'N/A'}</p>
                      <div className="flex items-center justify-between mt-1">
                         <Badge variant="outline" className="text-xs capitalize">
                          {deadline.status.replace(/_/g, ' ')}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {formatDeadlineDate(deadline.due_date!)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }) : <p className="text-muted-foreground text-center py-10">No upcoming deadlines.</p>}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Deadlines
            </Button>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
            <CardDescription>Weekly deadline overview</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground text-center">Calendar view not yet available.<br />This requires grouping RFPs by day.</p>
          </CardContent>
        </Card>
      </div>

      {/* Deadline Management */}
      <Card>
        <CardHeader>
          <CardTitle>Deadline Management</CardTitle>
          <CardDescription>Quick actions and bulk operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Set Reminder
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Review
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Flag Priority
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Notifications</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Email Alerts</span>
                  <span className="text-green-600">Enabled</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Push Notifications</span>
                  <span className="text-green-600">Enabled</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Daily Digest</span>
                  <span className="text-yellow-600">Disabled</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Statistics</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>On-time Rate</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg Days Early</span>
                  <span className="font-medium">2.3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Extensions Requested</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingDeadlinesTab;
