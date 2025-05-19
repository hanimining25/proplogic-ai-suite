import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Dashboard tabs configuration
const dashboardTabs = [
  { value: "overview", label: "Overview & Strategic Intelligence", path: "/dashboard" },
  { value: "executive", label: "Executive Summary", path: "/dashboard/executive-summary" },
  { value: "pipeline", label: "Pipeline Overview", path: "/dashboard/pipeline" },
  { value: "recent", label: "Recent Activity", path: "/dashboard/recent-activity" },
  { value: "winloss", label: "Win/Loss Trends", path: "/dashboard/win-loss" },
  { value: "deadlines", label: "Upcoming Deadlines", path: "/dashboard/deadlines" },
  { value: "ai-suggestions", label: "AI Suggestions", path: "/dashboard/ai-suggestions" },
  { value: "assistant", label: "Quick Access Assistant", path: "/dashboard/assistant" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    const activeTab = dashboardTabs.find(tab => tab.path === currentPath);
    return activeTab ? activeTab.value : "overview";
  };
  
  const handleTabChange = (value: string) => {
    const tab = dashboardTabs.find(tab => tab.value === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview and key performance indicators for your proposals and tenders.
        </p>
      </div>

      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full overflow-x-auto flex flex-nowrap">
          {dashboardTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="whitespace-nowrap">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-6">
          {currentPath === "/dashboard" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Overview & Strategic Intelligence</h3>
              {/* Original Dashboard content */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Proposals</CardTitle>
                    <CardDescription>Number of proposals created</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">125</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>RFP Conversion Rate</CardTitle>
                    <CardDescription>Conversion rate from RFP to Proposal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">67%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average Proposal Value</CardTitle>
                    <CardDescription>Average value of submitted proposals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$50,000</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          {/* The other tab content will be shown through routing */}
        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;
