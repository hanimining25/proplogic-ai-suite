
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";

// CRM tabs configuration
const crmTabs = [
  { value: "overview", label: "All Clients", path: "/crm" },
  { value: "contacts", label: "Contacts & Stakeholders", path: "/crm/contacts" },
  { value: "timeline", label: "Engagement Timeline", path: "/crm/timeline" },
  { value: "health", label: "Client Health Score", path: "/crm/health" },
  { value: "activity", label: "Activity Log", path: "/crm/activity" },
  { value: "opportunities", label: "Linked Opportunities", path: "/crm/opportunities" },
  { value: "insights", label: "Client Insights", path: "/crm/insights" },
];

const CRM = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    const activeTab = crmTabs.find(tab => tab.path === currentPath);
    return activeTab ? activeTab.value : "overview";
  };
  
  const handleTabChange = (value: string) => {
    const tab = crmTabs.find(tab => tab.value === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Clients & CRM</h2>
        <p className="text-muted-foreground">
          Manage your clients and relationships.
        </p>
      </div>

      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full overflow-x-auto flex flex-nowrap">
          {crmTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="whitespace-nowrap">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-6">
          {currentPath === "/crm" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">All Clients</h3>
              {/* Original CRM content */}
              <div className="grid gap-4">
                <p>Client management dashboard and overview.</p>
                {/* Add client list or other content here */}
              </div>
            </div>
          )}
          {/* The other tab content will be shown through routing */}
        </div>
      </Tabs>
    </div>
  );
};

export default CRM;
