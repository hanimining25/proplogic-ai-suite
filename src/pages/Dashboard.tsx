
import React from "react";
import { 
  FileText, 
  Users, 
  Clipboard, 
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import RFPStatusCard from "@/components/dashboard/RFPStatusCard";
import RecentRFPsTable from "@/components/dashboard/RecentRFPsTable";

const Dashboard = () => {
  // Sample data
  const rfpStatuses = {
    title: "RFP Pipeline Status",
    total: 48,
    items: [
      { label: "New", value: 12, color: "#3b82f6" },
      { label: "Reviewing", value: 8, color: "#8b5cf6" },
      { label: "In Progress", value: 15, color: "#f59e0b" },
      { label: "Submitted", value: 7, color: "#10b981" },
      { label: "Won", value: 4, color: "#059669" },
      { label: "Lost", value: 2, color: "#ef4444" },
    ],
  };

  const recentRFPs = [
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
    }
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="spotlight animate-spotlight bg-primary/20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active RFPs"
          value="35"
          description="12 new this month"
          icon={<FileText className="h-5 w-5 text-muted-foreground" />}
          trend={{ value: 8, isPositive: true }}
          className="animate-fade-in"
        />
        <StatsCard
          title="Active Clients"
          value="28"
          description="3 new this month"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          trend={{ value: 12, isPositive: true }}
          className="animate-fade-in [animation-delay:100ms]"
        />
        <StatsCard
          title="Proposals Submitted"
          value="47"
          description="This quarter"
          icon={<Clipboard className="h-5 w-5 text-muted-foreground" />}
          className="animate-fade-in [animation-delay:200ms]"
        />
        <StatsCard
          title="Win Rate"
          value="42%"
          description="Avg. last 3 months"
          icon={<CheckCircle className="h-5 w-5 text-muted-foreground" />}
          trend={{ value: 4, isPositive: true }}
          className="animate-fade-in [animation-delay:300ms]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <RFPStatusCard 
          title={rfpStatuses.title}
          total={rfpStatuses.total}
          items={rfpStatuses.items}
          className="lg:col-span-1 animate-fade-in [animation-delay:400ms]"
        />
        
        <Card className="lg:col-span-2 animate-fade-in [animation-delay:500ms]">
          {/* Placeholder for a chart - would implement with recharts */}
          <CardHeader>
            <CardTitle>Proposal Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center">
            <div className="text-muted-foreground text-center">
              <Clock className="h-10 w-10 mx-auto mb-3" />
              <p>Interactive performance chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <RecentRFPsTable 
        rfps={recentRFPs} 
        className="animate-fade-in [animation-delay:600ms]"
      />
    </div>
  );
};

// Import necessary components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default Dashboard;
