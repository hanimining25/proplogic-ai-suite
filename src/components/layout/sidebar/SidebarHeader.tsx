
import React from "react";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

const SidebarHeader = ({ isCollapsed }: SidebarHeaderProps) => {
  return (
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
  );
};

export default SidebarHeader;
