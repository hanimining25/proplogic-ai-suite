
import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";

interface MenuItem {
  to: string;
  icon: React.ReactNode;
  text: string;
}

interface SidebarMenuSectionProps {
  items: MenuItem[];
  isCollapsed: boolean;
}

const SidebarMenuSection = ({ items, isCollapsed }: SidebarMenuSectionProps) => {
  return (
    <ul className="space-y-1 px-2">
      {items.map((item) => (
        <SidebarMenuItem
          key={item.text}
          to={item.to}
          icon={item.icon}
          text={item.text}
          isCollapsed={isCollapsed}
        />
      ))}
    </ul>
  );
};

export default SidebarMenuSection;
