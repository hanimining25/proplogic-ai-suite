
import React from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

// Define the menu structure
interface MenuItem {
  text: string;
  to: string;
  icon: React.ReactNode;
}

const Sidebar = ({ isCollapsed, toggleSidebar }: SidebarProps) => {
  // Define all menu items
  const menuItems: MenuItem[] = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
    },
    {
      to: "/crm",
      icon: <Users size={20} />,
      text: "Clients & CRM",
    },
    {
      to: "/rfps",
      icon: <FileText size={20} />,
      text: "RFPs",
    },
    {
      to: "/proposals",
      icon: <FilePen size={20} />,
      text: "Proposal Builder",
    },
    {
      to: "/archive",
      icon: <Archive size={20} />,
      text: "Archive",
    },
    {
      to: "/reports",
      icon: <ChartBar size={20} />,
      text: "Reports & Insights",
    },
    {
      to: "/documents",
      icon: <Document size={20} />,
      text: "Documents & Templates",
    },
    {
      to: "/notifications",
      icon: <Bell size={20} />,
      text: "Notifications & Approvals",
    },
    {
      to: "/ai-admin",
      icon: <Bot size={20} />,
      text: "AI Admin Console",
    },
  ];

  const settingItems = [
    {
      to: "/settings",
      icon: <Settings size={20} />,
      text: "Settings",
    },
    {
      to: "/help",
      icon: <HelpCircle size={20} />,
      text: "Feedback & Help",
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
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center p-2 rounded-md",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )
                }
              >
                <span className="mr-3">{item.icon}</span>
                {!isCollapsed && <span>{item.text}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="border-t my-4"></div>

        <ul className="space-y-1 px-2">
          {settingItems.map((item) => (
            <li key={item.text}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center p-2 rounded-md",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )
                }
              >
                <span className="mr-3">{item.icon}</span>
                {!isCollapsed && <span>{item.text}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
