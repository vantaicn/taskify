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
  { title: "Kanban Board", url: "/boards", icon: KanbanSquare },
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
      ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary shadow-md"
      : "hover:bg-gradient-to-r hover:from-muted/30 hover:to-muted/50 text-muted-foreground hover:text-foreground transition-all duration-200";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-gradient-to-b from-background to-muted/20">
      <SidebarContent className="p-0">
        <SidebarGroup>
          <SidebarGroupContent>
            {!collapsed ? (
              <div className="flex items-center gap-3 p-4 border-b border-border/50 mb-2 bg-gradient-to-r from-primary/5 to-secondary/5">
                <Link to="/" className="flex items-center gap-3 group">
                  <div className="flex items-center justify-center bg-gradient-to-br from-primary via-primary to-secondary rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                    <KanbanSquare className="w-10 h-10 p-2 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Taskify
                    </h2>
                    <span className="text-xs text-muted-foreground">Project Management</span>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-center p-4 border-b border-border/50 mb-2">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="flex items-center justify-center bg-gradient-to-br from-primary to-secondary rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200">
                    <KanbanSquare className="w-8 h-8 p-1.5 text-white" />
                  </div>
                </Link>
              </div>
            )}
            <SidebarMenu>
              {navigationItems.map((item) => {
                return (
                  <SidebarMenuItem key={item.title} className="mb-1">
                    <SidebarMenuButton asChild className="rounded-lg">
                      <NavLink
                        to={item.url}
                        className={`${getNavCls({ isActive: isActive(item.url) })} rounded-lg px-5 py-2.5`}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{item.title}</span>
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
