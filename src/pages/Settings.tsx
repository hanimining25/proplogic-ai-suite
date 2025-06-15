
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import SecurityTab from "@/components/settings/SecurityTab";
import CompanySettingsTab from "@/components/settings/CompanySettingsTab";
import UsersTab from "@/components/settings/UsersTab";
import EmailTab from "@/components/settings/EmailTab";
import LocalizationTab from "@/components/settings/LocalizationTab";
import IntegrationsTab from "@/components/settings/IntegrationsTab";
import BillingTab from "@/components/settings/BillingTab";
import LegalTab from "@/components/settings/LegalTab";

// Settings tabs configuration
const settingsTabs = [
  { value: "company", label: "Company Settings", path: "/settings" },
  { value: "users", label: "User Roles & Permissions", path: "/settings/users" },
  { value: "email", label: "Email Templates & Workflows", path: "/settings/email" },
  { value: "localization", label: "Localization", path: "/settings/localization" },
  { value: "integrations", label: "API Integrations", path: "/settings/integrations" },
  { value: "security", label: "Security & Audit Logs", path: "/settings/security" },
  { value: "billing", label: "Subscription & Billing", path: "/settings/billing" },
  { value: "legal", label: "Legal & Compliance", path: "/settings/legal" },
];

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    const activeTab = settingsTabs.find(tab => tab.path === currentPath);
    return activeTab ? activeTab.value : "company";
  };
  
  const handleTabChange = (value: string) => {
    const tab = settingsTabs.find(tab => tab.value === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Platform, user, tenant, and integration configurations.
        </p>
      </div>

      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full overflow-x-auto flex flex-nowrap">
          {settingsTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="whitespace-nowrap">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-6">
          <Routes>
            <Route index element={<CompanySettingsTab />} />
            <Route path="users" element={<UsersTab />} />
            <Route path="email" element={<EmailTab />} />
            <Route path="localization" element={<LocalizationTab />} />
            <Route path="integrations" element={<IntegrationsTab />} />
            <Route path="security" element={<SecurityTab />} />
            <Route path="billing" element={<BillingTab />} />
            <Route path="legal" element={<LegalTab />} />
          </Routes>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
