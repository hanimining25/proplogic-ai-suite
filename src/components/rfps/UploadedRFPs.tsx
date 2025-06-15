
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRfps } from "@/data/rfps";
import { RFPsTable } from "@/components/rfps/RFPsTable";
import { Button } from "@/components/ui/button";
import { PlusCircle, AlertTriangle, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RFPFilters } from "@/components/rfps/RFPFilters";

export const UploadedRFPs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: rfps, isLoading, isError, error } = useQuery({
    queryKey: ['rfps'],
    queryFn: getRfps
  });

  const filteredRfps = useMemo(() => {
    if (!rfps) return [];
    return rfps.filter(rfp => {
      const searchTermMatch = searchTerm.trim() === '' ||
        rfp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (rfp.client_name && rfp.client_name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const statusMatch = statusFilter === 'all' || rfp.status === statusFilter;

      return searchTermMatch && statusMatch;
    });
  }, [rfps, searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }
  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error fetching RFPs</AlertTitle>
        <AlertDescription>{(error as Error).message}</AlertDescription>
      </Alert>
    );
  }
  if (!rfps || rfps.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <h3 className="text-xl font-semibold mb-2">No RFPs found</h3>
        <p className="text-muted-foreground mb-4">Get started by submitting a new RFP.</p>
        <Button onClick={() => navigate('/rfps/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Submit New RFP
        </Button>
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Uploaded RFPs</CardTitle>
        <CardDescription>Browse and manage all RFPs in the system. Use the filters below to narrow your search.</CardDescription>
      </CardHeader>
      <CardContent>
        <RFPFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        {filteredRfps && filteredRfps.length > 0 ? (
          <RFPsTable rfps={filteredRfps} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10 border rounded-lg">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No RFPs Match Your Criteria</h3>
            <p className="text-muted-foreground">Try adjusting your search term or status filter.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
