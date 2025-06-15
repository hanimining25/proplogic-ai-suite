
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import DraftProposals from "@/components/proposals/DraftProposals";
import TPBuilder from "@/components/proposals/TPBuilder";
import CPComposer from "@/components/proposals/CPComposer";
import ComplianceMatrix from "@/components/proposals/ComplianceMatrix";
import ReusableSections from "@/components/proposals/ReusableSections";
import AIWritingAssistant from "@/components/proposals/AIWritingAssistant";
import LegalClauseGenerator from "@/components/proposals/LegalClauseGenerator";
import ProposalSimulator from "@/components/proposals/ProposalSimulator";
import StyleToneAdapter from "@/components/proposals/StyleToneAdapter";
import ProposalScoringReport from "@/components/proposals/ProposalScoringReport";

// Proposals tabs configuration
const proposalTabs = [
  { value: "drafts", label: "Draft Proposals", path: "/proposals" },
  { value: "tp-builder", label: "TP Builder", path: "/proposals/tp-builder" },
  { value: "cp-composer", label: "CP Composer", path: "/proposals/cp-composer" },
  { value: "compliance", label: "Compliance Matrix", path: "/proposals/compliance" },
  { value: "sections", label: "Reusable Sections Library", path: "/proposals/sections" },
  { value: "ai-writing", label: "AI Writing Assistant", path: "/proposals/ai-writing" },
  { value: "clause-generator", label: "Legal Clause Generator", path: "/proposals/clause-generator" },
  { value: "simulator", label: "Proposal Simulator", path: "/proposals/simulator" },
  { value: "style", label: "Style & Tone Adapter", path: "/proposals/style" },
  { value: "scoring", label: "Proposal Scoring Report", path: "/proposals/scoring" },
];

const Proposals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    const activeTab = proposalTabs.find(tab => tab.path === currentPath);
    return activeTab ? activeTab.value : "drafts";
  };
  
  const handleTabChange = (value: string) => {
    const tab = proposalTabs.find(tab => tab.value === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Proposal Builder</h2>
        <p className="text-muted-foreground">
          Technical and commercial bid creation.
        </p>
      </div>

      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full overflow-x-auto flex flex-nowrap">
          {proposalTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="whitespace-nowrap">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-6">
          <Routes>
            <Route index element={<DraftProposals />} />
            <Route path="tp-builder" element={<TPBuilder />} />
            <Route path="cp-composer" element={<CPComposer />} />
            <Route path="compliance" element={<ComplianceMatrix />} />
            <Route path="sections" element={<ReusableSections />} />
            <Route path="ai-writing" element={<AIWritingAssistant />} />
            <Route path="clause-generator" element={<LegalClauseGenerator />} />
            <Route path="simulator" element={<ProposalSimulator />} />
            <Route path="style" element={<StyleToneAdapter />} />
            <Route path="scoring" element={<ProposalScoringReport />} />
          </Routes>
        </div>
      </Tabs>
    </div>
  );
};

export default Proposals;
