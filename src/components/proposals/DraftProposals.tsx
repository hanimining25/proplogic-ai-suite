
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProposals } from '@/data/proposals';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, PlusCircle, Search } from 'lucide-react';
import { ProposalFilters } from './ProposalFilters';
import { ProposalsTable } from './ProposalsTable';
import { Button } from '../ui/button';

const DraftProposals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: proposals, isLoading, isError, error } = useQuery({
    queryKey: ['proposals'],
    queryFn: getProposals,
  });

  const filteredProposals = useMemo(() => {
    if (!proposals) return [];
    return proposals.filter(p => {
      const searchTermMatch = searchTerm.trim() === '' ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.client.toLowerCase().includes(searchTerm.toLowerCase());
      
      const statusMatch = statusFilter === 'all' || p.status === statusFilter;

      return searchTermMatch && statusMatch;
    });
  }, [proposals, searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-12 w-full mb-6" />
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error fetching proposals</AlertTitle>
        <AlertDescription>{(error as Error).message}</AlertDescription>
      </Alert>
    );
  }
  
  if (!proposals || proposals.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <h3 className="text-xl font-semibold mb-2">No Proposals Found</h3>
        <p className="text-muted-foreground mb-4">Get started by creating a new proposal.</p>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Proposal
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Draft Proposals</CardTitle>
        <CardDescription>Manage and edit your draft proposals.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProposalFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        {filteredProposals && filteredProposals.length > 0 ? (
          <ProposalsTable proposals={filteredProposals} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10 border rounded-lg">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Proposals Match Your Criteria</h3>
            <p className="text-muted-foreground">Try adjusting your search term or status filter.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DraftProposals;
