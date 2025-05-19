
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

const Sidebar = ({ isCollapsed, toggleSidebar }: SidebarProps) => {
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

      <nav className="py-4">
        <ul className="space-y-1 px-2">
          <SidebarLink
            to="/dashboard"
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/crm"
            icon={<Users size={20} />}
            text="Clients & CRM"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/rfps"
            icon={<FileText size={20} />}
            text="RFPs"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/proposals"
            icon={<FilePen size={20} />}
            text="Proposal Builder"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/archive"
            icon={<Archive size={20} />}
            text="Archive"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/reports"
            icon={<ChartBar size={20} />}
            text="Reports & Insights"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/documents"
            icon={<Document size={20} />}
            text="Documents & Templates"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/notifications"
            icon={<Bell size={20} />}
            text="Notifications & Approvals"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/ai-admin"
            icon={<Bot size={20} />}
            text="AI Admin Console"
            isCollapsed={isCollapsed}
          />
        </ul>

        <div className="border-t my-4"></div>

        <ul className="space-y-1 px-2">
          <SidebarLink
            to="/settings"
            icon={<Settings size={20} />}
            text="Settings"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/help"
            icon={<HelpCircle size={20} />}
            text="Feedback & Help"
            isCollapsed={isCollapsed}
          />
        </ul>
      </nav>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ to, icon, text, isCollapsed }: SidebarLinkProps) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            "flex items-center p-2 rounded-md hover:bg-sidebar-accent group transition-all",
            isActive
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-sidebar-foreground"
          )
        }
      >
        <div className="mr-3">{icon}</div>
        {!isCollapsed && <span>{text}</span>}
      </NavLink>
    </li>
  );
};

export default Sidebar;
