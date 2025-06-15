
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { UploadedRFPs } from "@/components/rfps/UploadedRFPs";
import AIRelevanceScore from "@/components/rfps/AIRelevanceScore";
import RFPDetails from "@/components/rfps/RFPDetails";
import SupportingDocuments from "@/components/rfps/SupportingDocuments";
import RiskComplianceSummary from "@/components/rfps/RiskComplianceSummary";
import ClassificationRules from "@/components/rfps/ClassificationRules";
import RFPDraftBuilder from "@/components/rfps/RFPDraftBuilder";

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
          <Routes>
            <Route index element={<UploadedRFPs />} />
            <Route path="relevance" element={<AIRelevanceScore />} />
            <Route path="details" element={<RFPDetails />} />
            <Route path="documents" element={<SupportingDocuments />} />
            <Route path="risk" element={<RiskComplianceSummary />} />
            <Route path="rules" element={<ClassificationRules />} />
            <Route path="builder" element={<RFPDraftBuilder />} />
          </Routes>
        </div>
      </Tabs>
    </div>
  );
};

export default RFPs;
