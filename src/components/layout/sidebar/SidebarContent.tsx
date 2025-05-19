
import React from "react";
import SidebarMenuSection from "./SidebarMenuSection";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FilePen, 
  Archive, 
  ChartBar,
  Bell, 
  Bot, 
  Settings, 
  HelpCircle 
} from "lucide-react";

interface SidebarContentProps {
  isCollapsed: boolean;
}

const SidebarContent = ({ isCollapsed }: SidebarContentProps) => {
  // Define all menu items
  const menuItems = [
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
      icon: <FileText size={20} />,
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
    <nav className="py-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 4rem)" }}>
      <SidebarMenuSection items={menuItems} isCollapsed={isCollapsed} />
      
      <div className="border-t my-4"></div>
      
      <SidebarMenuSection items={settingItems} isCollapsed={isCollapsed} />
    </nav>
  );
};

export default SidebarContent;
