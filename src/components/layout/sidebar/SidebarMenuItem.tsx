
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarMenuItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
}

const SidebarMenuItem = ({ to, icon, text, isCollapsed }: SidebarMenuItemProps) => {
  return (
    <li key={text}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            "flex items-center p-2 rounded-md",
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )
        }
      >
        <span className="mr-3">{icon}</span>
        {!isCollapsed && <span>{text}</span>}
      </NavLink>
    </li>
  );
};

export default SidebarMenuItem;
