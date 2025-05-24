
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileTab from "@/components/settings/ProfileTab";
import NotificationsTab from "@/components/settings/NotificationsTab";
import AppearanceTab from "@/components/settings/AppearanceTab";
import SecurityTab from "@/components/settings/SecurityTab";

// Settings tabs configuration
const settingsTabs = [
  { value: "profile", label: "Company Settings", path: "/settings/company" },
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
    return activeTab ? activeTab.value : "profile";
  };
  
  const handleTabChange = (value: string) => {
    const tab = settingsTabs.find(tab => tab.value === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  // Default profile data for the ProfileTab component
  const defaultProfileData = {
    name: "John Doe",
    email: "john.doe@company.com",
    position: "Senior Manager",
    bio: "Experienced professional with expertise in proposal management and business development."
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
          {currentPath === "/settings/company" && (
            <TabsContent value="profile" className="space-y-6">
              <ProfileTab initialData={defaultProfileData} />
            </TabsContent>
          )}
          {currentPath === "/settings/security" && (
            <TabsContent value="security" className="space-y-6">
              <SecurityTab />
            </TabsContent>
          )}
          {currentPath === "/settings/users" && (
            <TabsContent value="users" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">User Roles & Permissions</h3>
                <p>Manage user roles and permissions settings.</p>
                {/* Add user management content here */}
              </div>
            </TabsContent>
          )}
          {currentPath === "/settings/email" && (
            <TabsContent value="email" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Email Templates & Workflows</h3>
                <p>Configure email templates and workflows.</p>
                {/* Add email settings content here */}
              </div>
            </TabsContent>
          )}
          {currentPath === "/settings/localization" && (
            <TabsContent value="localization" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Localization</h3>
                <p>Manage localization settings.</p>
                {/* Add localization settings content here */}
              </div>
            </TabsContent>
          )}
          {currentPath === "/settings/integrations" && (
            <TabsContent value="integrations" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">API Integrations</h3>
                <p>Configure API integrations.</p>
                {/* Add integrations settings content here */}
              </div>
            </TabsContent>
          )}
          {currentPath === "/settings/billing" && (
            <TabsContent value="billing" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Subscription & Billing</h3>
                <p>Manage subscription and billing settings.</p>
                {/* Add billing settings content here */}
              </div>
            </TabsContent>
          )}
          {currentPath === "/settings/legal" && (
            <TabsContent value="legal" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Legal & Compliance</h3>
                <p>Manage legal and compliance settings.</p>
                {/* Add legal settings content here */}
              </div>
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
