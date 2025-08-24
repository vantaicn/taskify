import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "../lib/react-query";
import AuthShield from "../components/auth/AuthShield";
import { Toaster } from "../components/ui/sonner";
import { SidebarProvider } from "../components/ui/sidebar";
import AppSidebar from "../components/layout/AppSidebar";
import AppHeader from "../components/layout/AppHeader";
import { ThemeProvider } from "../components/darkmode/theme-provider";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Router>
            <SidebarProvider>
              <div className="flex h-screen bg-background w-full overflow-hidden">
                <AppSidebar />
                <AuthShield>
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <AppHeader />
                    <main className="flex-1 overflow-auto">
                      {children}
                    </main>
                  </div>
                </AuthShield>
              </div>
            </SidebarProvider>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default AppProvider;
