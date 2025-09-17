import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "../lib/react-query";
import AuthShield from "../components/auth/AuthShield";
import { Toaster } from "../components/ui/sonner";
import { TooltipProvider } from "../components/ui/tooltip";
import LayoutWrapper from "../components/layout/LayoutWrapper";
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
            <TooltipProvider>
              <AuthShield>
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
              </AuthShield>
            </TooltipProvider>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default AppProvider;
