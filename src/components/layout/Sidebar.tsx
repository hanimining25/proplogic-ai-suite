
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  FilePen,
  Archive,
  ChartBar,
  FileText as Document,
  Bell,
  Bot,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

// Define the submenu structure for better organization
interface SubMenuItem {
  text: string;
  to: string;
}

interface MenuItem {
  text: string;
  to: string;
  icon: React.ReactNode;
  subMenuItems?: SubMenuItem[];
}

const Sidebar = ({ isCollapsed, toggleSidebar }: SidebarProps) => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (menuText: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuText]: !prev[menuText],
    }));
  };

  // Define all menu items with their submenu structures
  const menuItems: MenuItem[] = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      subMenuItems: [
        { text: "Overview & Strategic Intelligence", to: "/dashboard" },
        { text: "Executive Summary", to: "/dashboard/executive-summary" },
        { text: "Pipeline Overview", to: "/dashboard/pipeline" },
        { text: "Recent Activity", to: "/dashboard/recent-activity" },
        { text: "Win/Loss Trends", to: "/dashboard/win-loss" },
        { text: "Upcoming Deadlines", to: "/dashboard/deadlines" },
        { text: "AI Suggestions", to: "/dashboard/ai-suggestions" },
        { text: "Quick Access Assistant", to: "/dashboard/assistant" },
      ],
    },
    {
      to: "/crm",
      icon: <Users size={20} />,
      text: "Clients & CRM",
      subMenuItems: [
        { text: "All Clients", to: "/crm/clients" },
        { text: "Contacts & Stakeholders", to: "/crm/contacts" },
        { text: "Engagement Timeline", to: "/crm/timeline" },
        { text: "Client Health Score", to: "/crm/health" },
        { text: "Activity Log", to: "/crm/activity" },
        { text: "Linked Opportunities", to: "/crm/opportunities" },
        { text: "Client Insights", to: "/crm/insights" },
      ],
    },
    {
      to: "/rfps",
      icon: <FileText size={20} />,
      text: "RFPs",
      subMenuItems: [
        { text: "Discover RFPs", to: "/rfps/discover" },
        { text: "Uploaded RFPs", to: "/rfps/uploaded" },
        { text: "AI Relevance Score", to: "/rfps/relevance" },
        { text: "RFP Details & SoW", to: "/rfps/details" },
        { text: "Supporting Documents", to: "/rfps/documents" },
        { text: "Risk/Compliance Summary", to: "/rfps/risk" },
        { text: "Classification Rules", to: "/rfps/rules" },
        { text: "RFP Draft Builder", to: "/rfps/builder" },
      ],
    },
    {
      to: "/proposals",
      icon: <FilePen size={20} />,
      text: "Proposal Builder",
      subMenuItems: [
        { text: "Draft Proposals", to: "/proposals/drafts" },
        { text: "TP Builder", to: "/proposals/tp-builder" },
        { text: "CP Composer", to: "/proposals/cp-composer" },
        { text: "Compliance Matrix", to: "/proposals/compliance" },
        { text: "Reusable Sections Library", to: "/proposals/sections" },
        { text: "AI Writing Assistant", to: "/proposals/ai-writing" },
        { text: "Legal Clause Generator", to: "/proposals/clause-generator" },
        { text: "Proposal Simulator", to: "/proposals/simulator" },
        { text: "Style & Tone Adapter", to: "/proposals/style" },
        { text: "Proposal Scoring Report", to: "/proposals/scoring" },
      ],
    },
    {
      to: "/archive",
      icon: <Archive size={20} />,
      text: "Archive",
      subMenuItems: [
        { text: "Proposal Archive", to: "/archive/proposals" },
        { text: "Tender Archive", to: "/archive/tenders" },
        { text: "Version History", to: "/archive/history" },
        { text: "Reuse Memory Bank", to: "/archive/memory" },
        { text: "Past Go/No-Go Decisions", to: "/archive/decisions" },
        { text: "Search", to: "/archive/search" },
      ],
    },
    {
      to: "/reports",
      icon: <ChartBar size={20} />,
      text: "Reports & Insights",
      subMenuItems: [
        { text: "Win/Loss Analysis", to: "/reports/win-loss" },
        { text: "Sales Performance", to: "/reports/sales" },
        { text: "Team & Manager Insights", to: "/reports/team" },
        { text: "Vertical-Wise Benchmarking", to: "/reports/benchmarking" },
        { text: "Account Forecasting", to: "/reports/forecasting" },
        { text: "Proposal Success Factors", to: "/reports/success-factors" },
        { text: "RFP Source Analysis", to: "/reports/source-analysis" },
        { text: "Cross-Client Intelligence", to: "/reports/cross-client" },
      ],
    },
    {
      to: "/documents",
      icon: <Document size={20} />,
      text: "Documents & Templates",
      subMenuItems: [
        { text: "Template Manager", to: "/documents/templates" },
        { text: "Section Bank", to: "/documents/sections" },
        { text: "Clause Reuse Library", to: "/documents/clauses" },
        { text: "Uploaded Files", to: "/documents/files" },
        { text: "Version Comparator", to: "/documents/versions" },
        { text: "Cloud Integrations", to: "/documents/integrations" },
        { text: "OCR & Tagging Engine", to: "/documents/ocr" },
      ],
    },
    {
      to: "/notifications",
      icon: <Bell size={20} />,
      text: "Notifications & Approvals",
      subMenuItems: [
        { text: "All Notifications", to: "/notifications/all" },
        { text: "Approval Requests", to: "/notifications/approvals" },
        { text: "Pending Submissions", to: "/notifications/pending" },
        { text: "Auto Reminders", to: "/notifications/reminders" },
        { text: "Feedback Logs", to: "/notifications/feedback" },
        { text: "Action Timelines", to: "/notifications/timelines" },
      ],
    },
    {
      to: "/ai-admin",
      icon: <Bot size={20} />,
      text: "AI Admin Console",
      subMenuItems: [
        { text: "AI Agents Overview", to: "/ai-admin/agents" },
        { text: "Prompt Management", to: "/ai-admin/prompts" },
        { text: "Memory Engine Dashboard", to: "/ai-admin/memory" },
        { text: "Agent Settings", to: "/ai-admin/settings" },
        { text: "AI Logs & Training Feedback", to: "/ai-admin/logs" },
        { text: "Governance Rules", to: "/ai-admin/governance" },
        { text: "External AI Integrations", to: "/ai-admin/integrations" },
      ],
    },
  ];

  const settingItems = [
    {
      to: "/settings",
      icon: <Settings size={20} />,
      text: "Settings",
      subMenuItems: [
        { text: "Company Settings", to: "/settings/company" },
        { text: "User Roles & Permissions", to: "/settings/users" },
        { text: "Email Templates & Workflows", to: "/settings/email" },
        { text: "Localization", to: "/settings/localization" },
        { text: "API Integrations", to: "/settings/integrations" },
        { text: "Security & Audit Logs", to: "/settings/security" },
        { text: "Subscription & Billing", to: "/settings/billing" },
        { text: "Legal & Compliance", to: "/settings/legal" },
      ],
    },
    {
      to: "/help",
      icon: <HelpCircle size={20} />,
      text: "Feedback & Help",
      subMenuItems: [
        { text: "Submit Feedback", to: "/help/feedback" },
        { text: "Feature Requests", to: "/help/features" },
        { text: "Help Center / Docs", to: "/help/docs" },
        { text: "Live Chat", to: "/help/chat" },
        { text: "AI Chat Support", to: "/help/ai-chat" },
        { text: "Tutorial Walkthroughs", to: "/help/tutorials" },
        { text: "Changelog & Updates", to: "/help/changelog" },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "h-screen fixed top-0 left-0 z-10 bg-sidebar transition-all duration-300 border-r",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b">
        {!isCollapsed && (
          <div className="text-lg font-semibold text-gradient">
            PropLogic AI
          </div>
        )}
        {isCollapsed && (
          <div className="w-full flex justify-center">
            <div className="text-lg font-bold text-gradient">P</div>
          </div>
        )}
      </div>

      <nav className="py-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 4rem)" }}>
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.text}>
              <div className="flex flex-col">
                <button
                  onClick={() => toggleSubmenu(item.text)}
                  className={cn(
                    "flex items-center p-2 rounded-md w-full text-left",
                    expandedMenus[item.text] ? "bg-primary text-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.text}</span>
                      {expandedMenus[item.text] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </>
                  )}
                </button>

                {!isCollapsed && expandedMenus[item.text] && item.subMenuItems && (
                  <ul className="pl-9 mt-1 space-y-1">
                    {item.subMenuItems.map((subItem) => (
                      <li key={subItem.text}>
                        <NavLink
                          to={subItem.to}
                          className={({ isActive }) =>
                            cn(
                              "block p-2 rounded-md text-sm",
                              isActive
                                ? "bg-sidebar-accent text-primary"
                                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                            )
                          }
                        >
                          {subItem.text}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t my-4"></div>

        <ul className="space-y-1 px-2">
          {settingItems.map((item) => (
            <li key={item.text}>
              <div className="flex flex-col">
                <button
                  onClick={() => toggleSubmenu(item.text)}
                  className={cn(
                    "flex items-center p-2 rounded-md w-full text-left",
                    expandedMenus[item.text] ? "bg-primary text-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.text}</span>
                      {expandedMenus[item.text] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </>
                  )}
                </button>

                {!isCollapsed && expandedMenus[item.text] && item.subMenuItems && (
                  <ul className="pl-9 mt-1 space-y-1">
                    {item.subMenuItems.map((subItem) => (
                      <li key={subItem.text}>
                        <NavLink
                          to={subItem.to}
                          className={({ isActive }) =>
                            cn(
                              "block p-2 rounded-md text-sm",
                              isActive
                                ? "bg-sidebar-accent text-primary"
                                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                            )
                          }
                        >
                          {subItem.text}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
