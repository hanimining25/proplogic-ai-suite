import React, { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRfps } from "@/data/rfps";
import { RFPsTable } from "@/components/rfps/RFPsTable";
import { Button } from "@/components/ui/button";
import { PlusCircle, AlertTriangle, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RFPFilters } from "@/components/rfps/RFPFilters";

// RFPs tabs configuration
const rfpTabs = [
  { value: "overview", label: "Uploaded RFPs", path: "/rfps" },
  { value: "relevance", label: "AI Relevance Score", path: "/rfps/relevance" },
  { value: "details", label: "RFP Details & SoW", path: "/rfps/details" },
  { value: "documents", label: "Supporting Documents", path: "/rfps/documents" },
  { value: "risk", label: "Risk/Compliance Summary", path: "/rfps/risk" },
  { value: "rules", label: "Classification Rules", path: "/rfps/rules" },
  { value: "builder", label: "RFP Draft Builder", path: "/rfps/builder" },
];

const RFPs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

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
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    const activeTab = rfpTabs.find(tab => tab.path === currentPath);
    return activeTab ? activeTab.value : "overview";
  };
  
  const handleTabChange = (value: string) => {
    const tab = rfpTabs.find(tab => tab.value === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  const renderContent = () => {
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
          <AlertDescription>{error.message}</AlertDescription>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RFPs</h2>
          <p className="text-muted-foreground">
            RFP discovery, ingestion & analysis.
          </p>
        </div>
        <Button onClick={() => navigate('/rfps/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New RFP
        </Button>
      </div>

      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full overflow-x-auto flex flex-nowrap">
          {rfpTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="whitespace-nowrap">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-6">
          {currentPath === "/rfps" && (
            renderContent()
          )}
          {/* The other tab content will be shown through routing */}
        </div>
      </Tabs>
    </div>
  );
};

export default RFPs;
