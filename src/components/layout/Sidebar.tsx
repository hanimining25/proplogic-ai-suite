
import React from "react";
import { cn } from "@/lib/utils";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarContent from "./sidebar/SidebarContent";

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
      <SidebarHeader isCollapsed={isCollapsed} />
      <SidebarContent isCollapsed={isCollapsed} />
    </div>
  );
};

export default Sidebar;
