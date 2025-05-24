
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import OverviewTab from "@/components/dashboard/OverviewTab";
import ExecutiveSummaryTab from "@/components/dashboard/ExecutiveSummaryTab";
import PipelineOverviewTab from "@/components/dashboard/PipelineOverviewTab";
import RecentActivityTab from "@/components/dashboard/RecentActivityTab";
import WinLossTrendsTab from "@/components/dashboard/WinLossTrendsTab";
import UpcomingDeadlinesTab from "@/components/dashboard/UpcomingDeadlinesTab";
import AISuggestionsTab from "@/components/dashboard/AISuggestionsTab";
import QuickAccessAssistantTab from "@/components/dashboard/QuickAccessAssistantTab";

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
          {currentPath === "/dashboard" && <OverviewTab />}
          {currentPath === "/dashboard/executive-summary" && <ExecutiveSummaryTab />}
          {currentPath === "/dashboard/pipeline" && <PipelineOverviewTab />}
          {currentPath === "/dashboard/recent-activity" && <RecentActivityTab />}
          {currentPath === "/dashboard/win-loss" && <WinLossTrendsTab />}
          {currentPath === "/dashboard/deadlines" && <UpcomingDeadlinesTab />}
          {currentPath === "/dashboard/ai-suggestions" && <AISuggestionsTab />}
          {currentPath === "/dashboard/assistant" && <QuickAccessAssistantTab />}
        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;
