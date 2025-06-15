import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CRM from "./pages/CRM";
import RFPs from "./pages/RFPs";
import Proposals from "./pages/Proposals";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <div className="min-h-screen">
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Dashboard routes - all handled within Dashboard component */}
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/dashboard/executive-summary" element={<Layout><Dashboard /></Layout>} />
              <Route path="/dashboard/pipeline" element={<Layout><Dashboard /></Layout>} />
              <Route path="/dashboard/recent-activity" element={<Layout><Dashboard /></Layout>} />
              <Route path="/dashboard/win-loss" element={<Layout><Dashboard /></Layout>} />
              <Route path="/dashboard/deadlines" element={<Layout><Dashboard /></Layout>} />
              <Route path="/dashboard/ai-suggestions" element={<Layout><Dashboard /></Layout>} />
              <Route path="/dashboard/assistant" element={<Layout><Dashboard /></Layout>} />
              
              {/* CRM routes - all handled within CRM component */}
              <Route path="/crm" element={<Layout><CRM /></Layout>} />
              <Route path="/crm/contacts" element={<Layout><CRM /></Layout>} />
              <Route path="/crm/timeline" element={<Layout><CRM /></Layout>} />
              <Route path="/crm/health" element={<Layout><CRM /></Layout>} />
              <Route path="/crm/activity" element={<Layout><CRM /></Layout>} />
              <Route path="/crm/opportunities" element={<Layout><CRM /></Layout>} />
              <Route path="/crm/insights" element={<Layout><CRM /></Layout>} />
              
              {/* RFPs routes */}
              <Route path="/rfps" element={<Layout><RFPs /></Layout>} />
              <Route path="/rfps/discover" element={<Layout><NotFound /></Layout>} />
              <Route path="/rfps/uploaded" element={<Layout><NotFound /></Layout>} />
              <Route path="/rfps/relevance" element={<Layout><NotFound /></Layout>} />
              <Route path="/rfps/details" element={<Layout><NotFound /></Layout>} />
              <Route path="/rfps/documents" element={<Layout><NotFound /></Layout>} />
              <Route path="/rfps/risk" element={<Layout><NotFound /></Layout>} />
              <Route path="/rfps/rules" element={<Layout><NotFound /></Layout>} />
              <Route path="/rfps/builder" element={<Layout><NotFound /></Layout>} />
              
              {/* Proposals routes */}
              <Route path="/proposals" element={<Layout><Proposals /></Layout>} />
              <Route path="/proposals/drafts" element={<Layout><NotFound /></Layout>} />
              <Route path="/proposals/tp-builder" element={<Layout><NotFound /></Layout>} />
              <Route path="/proposals/cp-composer" element={<Layout><NotFound /></Layout>} />
              <Route path="/proposals/compliance" element={<Layout><NotFound /></Layout>} />
              <Route path="/proposals/sections" element={<Layout><NotFound /></Layout>} />
              <Route path="/proposals/ai-writing" element={<Layout><NotFound /></Layout>} />
              <Route path="/proposals/clause-generator" element={<Layout><NotFound /></Layout>} />
              <Route path="/proposals/simulator" element={<Layout><NotFound /></Layout>} />
              <Route path="/proposals/style" element={<Layout><NotFound /></Layout>} />
              <Route path="/proposals/scoring" element={<Layout><NotFound /></Layout>} />
              
              {/* Archive routes */}
              <Route path="/archive" element={<Layout><NotFound /></Layout>} />
              <Route path="/archive/proposals" element={<Layout><NotFound /></Layout>} />
              <Route path="/archive/tenders" element={<Layout><NotFound /></Layout>} />
              <Route path="/archive/history" element={<Layout><NotFound /></Layout>} />
              <Route path="/archive/memory" element={<Layout><NotFound /></Layout>} />
              <Route path="/archive/decisions" element={<Layout><NotFound /></Layout>} />
              <Route path="/archive/search" element={<Layout><NotFound /></Layout>} />
              
              {/* Reports routes */}
              <Route path="/reports" element={<Layout><NotFound /></Layout>} />
              <Route path="/reports/win-loss" element={<Layout><NotFound /></Layout>} />
              <Route path="/reports/sales" element={<Layout><NotFound /></Layout>} />
              <Route path="/reports/team" element={<Layout><NotFound /></Layout>} />
              <Route path="/reports/benchmarking" element={<Layout><NotFound /></Layout>} />
              <Route path="/reports/forecasting" element={<Layout><NotFound /></Layout>} />
              <Route path="/reports/success-factors" element={<Layout><NotFound /></Layout>} />
              <Route path="/reports/source-analysis" element={<Layout><NotFound /></Layout>} />
              <Route path="/reports/cross-client" element={<Layout><NotFound /></Layout>} />
              
              {/* Documents routes */}
              <Route path="/documents" element={<Layout><NotFound /></Layout>} />
              <Route path="/documents/templates" element={<Layout><NotFound /></Layout>} />
              <Route path="/documents/sections" element={<Layout><NotFound /></Layout>} />
              <Route path="/documents/clauses" element={<Layout><NotFound /></Layout>} />
              <Route path="/documents/files" element={<Layout><NotFound /></Layout>} />
              <Route path="/documents/versions" element={<Layout><NotFound /></Layout>} />
              <Route path="/documents/integrations" element={<Layout><NotFound /></Layout>} />
              <Route path="/documents/ocr" element={<Layout><NotFound /></Layout>} />
              
              {/* Notifications routes */}
              <Route path="/notifications" element={<Layout><NotFound /></Layout>} />
              <Route path="/notifications/all" element={<Layout><NotFound /></Layout>} />
              <Route path="/notifications/approvals" element={<Layout><NotFound /></Layout>} />
              <Route path="/notifications/pending" element={<Layout><NotFound /></Layout>} />
              <Route path="/notifications/reminders" element={<Layout><NotFound /></Layout>} />
              <Route path="/notifications/feedback" element={<Layout><NotFound /></Layout>} />
              <Route path="/notifications/timelines" element={<Layout><NotFound /></Layout>} />
              
              {/* AI Admin routes */}
              <Route path="/ai-admin" element={<Layout><NotFound /></Layout>} />
              <Route path="/ai-admin/agents" element={<Layout><NotFound /></Layout>} />
              <Route path="/ai-admin/prompts" element={<Layout><NotFound /></Layout>} />
              <Route path="/ai-admin/memory" element={<Layout><NotFound /></Layout>} />
              <Route path="/ai-admin/settings" element={<Layout><NotFound /></Layout>} />
              <Route path="/ai-admin/logs" element={<Layout><NotFound /></Layout>} />
              <Route path="/ai-admin/governance" element={<Layout><NotFound /></Layout>} />
              <Route path="/ai-admin/integrations" element={<Layout><NotFound /></Layout>} />
              
              {/* Settings routes */}
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
              <Route path="/settings/company" element={<Layout><Settings /></Layout>} />
              <Route path="/settings/users" element={<Layout><Settings /></Layout>} />
              <Route path="/settings/email" element={<Layout><Settings /></Layout>} />
              <Route path="/settings/localization" element={<Layout><Settings /></Layout>} />
              <Route path="/settings/integrations" element={<Layout><Settings /></Layout>} />
              <Route path="/settings/security" element={<Layout><Settings /></Layout>} />
              <Route path="/settings/billing" element={<Layout><Settings /></Layout>} />
              <Route path="/settings/legal" element={<Layout><Settings /></Layout>} />
              
              {/* Help routes */}
              <Route path="/help" element={<Layout><NotFound /></Layout>} />
              <Route path="/help/feedback" element={<Layout><NotFound /></Layout>} />
              <Route path="/help/features" element={<Layout><NotFound /></Layout>} />
              <Route path="/help/docs" element={<Layout><NotFound /></Layout>} />
              <Route path="/help/chat" element={<Layout><NotFound /></Layout>} />
              <Route path="/help/ai-chat" element={<Layout><NotFound /></Layout>} />
              <Route path="/help/tutorials" element={<Layout><NotFound /></Layout>} />
              <Route path="/help/changelog" element={<Layout><NotFound /></Layout>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
