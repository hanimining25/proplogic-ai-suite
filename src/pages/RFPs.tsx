
import React from "react";
import { 
  Button,
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui";
import { FileText, Plus, Upload } from "lucide-react";
import RecentRFPsTable from "@/components/dashboard/RecentRFPsTable";

const RFPs = () => {
  // Sample data - reusing the same structure as in Dashboard
  const allRFPs = [
    {
      id: "1",
      title: "IT Infrastructure Upgrade",
      client: "Ministry of Education",
      deadline: "May 25, 2025",
      status: "In Progress" as const,
      relevance: 85,
      value: "$450,000",
    },
    {
      id: "2",
      title: "Digital Transformation",
      client: "Saudi Telecom",
      deadline: "Jun 10, 2025",
      status: "Reviewing" as const,
      relevance: 72,
      value: "$1,200,000",
    },
    {
      id: "3",
      title: "ERP Implementation",
      client: "SABIC",
      deadline: "Jun 5, 2025",
      status: "New" as const,
      relevance: 93,
      value: "$780,000",
    },
    {
      id: "4",
      title: "Cloud Migration Services",
      client: "Saudi Aramco",
      deadline: "May 15, 2025",
      status: "Submitted" as const,
      relevance: 88,
      value: "$950,000",
    },
    {
      id: "5",
      title: "Cybersecurity Assessment",
      client: "Saudi Airlines",
      deadline: "Apr 30, 2025",
      status: "Won" as const,
      relevance: 75,
      value: "$320,000",
    },
    {
      id: "6",
      title: "Data Center Consolidation",
      client: "NEOM",
      deadline: "Jun 20, 2025",
      status: "New" as const,
      relevance: 91,
      value: "$2,300,000",
    },
    {
      id: "7",
      title: "Network Security Audit",
      client: "Saudi National Bank",
      deadline: "May 28, 2025",
      status: "Reviewing" as const,
      relevance: 65,
      value: "$180,000",
    },
    {
      id: "8",
      title: "AI Strategy Development",
      client: "Saudi Aramco",
      deadline: "Jul 15, 2025",
      status: "New" as const,
      relevance: 88,
      value: "$550,000",
    }
  ];

  const newRFPs = allRFPs.filter(rfp => rfp.status === "New");
  const activeRFPs = allRFPs.filter(rfp => ["In Progress", "Reviewing"].includes(rfp.status));
  const submittedRFPs = allRFPs.filter(rfp => ["Submitted", "Won", "Lost"].includes(rfp.status));

  return (
    <div className="space-y-6">
      <div className="relative">
        <h1 className="text-3xl font-bold mb-6">RFP Management</h1>
        <div className="spotlight animate-spotlight bg-primary/20" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button>
            <FileText className="mr-2 h-4 w-4" /> Create New RFP
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import from Etimad
          </Button>
        </div>
      </div>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>RFPs</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All RFPs</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <RecentRFPsTable rfps={allRFPs} />
            </TabsContent>
            <TabsContent value="new">
              <RecentRFPsTable rfps={newRFPs} />
            </TabsContent>
            <TabsContent value="active">
              <RecentRFPsTable rfps={activeRFPs} />
            </TabsContent>
            <TabsContent value="submitted">
              <RecentRFPsTable rfps={submittedRFPs} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RFPs;
