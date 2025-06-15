
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRfpById } from '@/data/rfps';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, ArrowLeft, Calendar, FileText, User, Tag, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const statusDetails: { [key: string]: { icon: React.ElementType, color: string, label: string } } = {
  new: { icon: Tag, color: 'bg-blue-500', label: 'New' },
  in_progress: { icon: Calendar, color: 'bg-yellow-500', label: 'In Progress' },
  submitted: { icon: CheckCircle, color: 'bg-green-500', label: 'Submitted' },
  won: { icon: CheckCircle, color: 'bg-emerald-500', label: 'Won' },
  lost: { icon: XCircle, color: 'bg-red-500', label: 'Lost' },
  archived: { icon: FileText, color: 'bg-gray-500', label: 'Archived' },
};

const capitalize = (s: string) => {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
};

const RFPDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: rfp, isLoading, isError, error } = useQuery({
    queryKey: ['rfp', id],
    queryFn: () => getRfpById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error fetching RFP</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }
  
  if (!rfp) {
    return (
         <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">RFP Not Found</h2>
            <p className="text-muted-foreground mb-6">The RFP you are looking for does not exist or has been moved.</p>
            <Button onClick={() => navigate('/rfps')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all RFPs
            </Button>
        </div>
    );
  }

  const currentStatus = statusDetails[rfp.status] || { icon: Tag, color: 'bg-gray-500', label: capitalize(rfp.status) };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/rfps')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to RFPs
        </Button>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{rfp.title}</h2>
        <p className="text-muted-foreground">Detailed view of the Request for Proposal.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Client</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rfp.client_name || 'N/A'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Due Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rfp.due_date ? format(new Date(rfp.due_date), 'PP') : 'N/A'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <currentStatus.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <Badge variant="outline" className={cn('text-lg', currentStatus.color, 'text-white')}>
                {currentStatus.label}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>RFP Summary</CardTitle>
                <CardDescription>AI-generated summary of the RFP document.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    {rfp.summary || "No summary available. Process the document to generate one."}
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>AI Relevance Score</CardTitle>
                <CardDescription>How well this RFP matches our profile.</CardDescription>
            </CardHeader>
            <CardContent>
            {rfp.relevance_score ? (
              <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold">{rfp.relevance_score}%</div>
                  <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full',
                        rfp.relevance_score >= 80
                          ? 'bg-emerald-500'
                          : rfp.relevance_score >= 60
                          ? 'bg-green-500'
                          : rfp.relevance_score >= 40
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      )}
                      style={{ width: `${rfp.relevance_score}%` }}
                    ></div>
                  </div>
              </div>
            ) : (
              'N/A'
            )}
            </CardContent>
        </Card>
      </div>

       {rfp.document_url && (
            <Card>
                <CardHeader>
                    <CardTitle>Document</CardTitle>
                </CardHeader>
                <CardContent>
                    <a href={rfp.document_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        View/Download Document
                    </a>
                </CardContent>
            </Card>
        )}
    </div>
  );
};

export default RFPDetailPage;
