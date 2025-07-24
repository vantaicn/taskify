import React, { useState } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  KanbanSquare,
  Calendar,
  Users,
  BarChart3,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "../ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Kanban Board", url: "/board", icon: KanbanSquare },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Members", url: "/members", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary/20 text-primary border-r-2"
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {!collapsed ? (
              <div className="flex items-center gap-2 p-2 border-b-1 mb-4">
                <Link to="/" className="flex items-center gap-2">
                  <div className="flex items-center justify-center bg-gradient-primary rounded-lg">
                    <KanbanSquare className="w-10 h-10" />
                  </div>
                  <h2 className="text-lg font-semibold">Taskify</h2>
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-center p-4 border-b-1 mb-4">
                <Link to="/" className="flex items-center gap-2">
                  <KanbanSquare className="w-5 h-5" />
                </Link>
              </div>
            )}
            <SidebarMenu>
              {navigationItems.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={getNavCls({ isActive: isActive(item.url) })}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
