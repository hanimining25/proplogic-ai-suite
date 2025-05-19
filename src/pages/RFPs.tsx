
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";

// RFPs tabs configuration
const rfpTabs = [
  { value: "overview", label: "Discover RFPs", path: "/rfps" },
  { value: "uploaded", label: "Uploaded RFPs", path: "/rfps/uploaded" },
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">RFPs</h2>
        <p className="text-muted-foreground">
          RFP discovery, ingestion & analysis.
        </p>
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
            <div>
              <h3 className="text-xl font-semibold mb-4">Discover RFPs</h3>
              <div className="grid gap-4">
                <p>Find and discover new RFP opportunities.</p>
                {/* Original RFPs content */}
              </div>
            </div>
          )}
          {/* The other tab content will be shown through routing */}
        </div>
      </Tabs>
    </div>
  );
};

export default RFPs;
