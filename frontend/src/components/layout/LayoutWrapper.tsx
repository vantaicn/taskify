import React from "react";
import { useLocation } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

type LayoutWrapperProps = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isLoginRegisterPage = ['/login', '/register'].includes(currentPath);
  const isBoardsPage = currentPath === '/boards';

  const showHeader = !isLoginRegisterPage;
  const showSidebar = isBoardsPage;

  if (isLoginRegisterPage) {
    return (
      <div className="h-screen bg-background w-full overflow-hidden">
        <main className="h-full overflow-auto">
          {children}
        </main>
      </div>
    );
  }

  if (showSidebar) {
    return (
      <SidebarProvider>
        <div className="flex h-screen bg-background w-full overflow-hidden">
          <AppSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {showHeader && <AppHeader />}
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <div className="h-screen bg-background w-full overflow-hidden">
      {showHeader && <AppHeader />}
      <main className={`${showHeader ? 'h-[calc(100vh-3rem)]' : 'h-full'} overflow-auto`}>
        {children}
      </main>
    </div>
  );
};

export default LayoutWrapper;