import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from '../lib/react-query';
import AuthShield from '../components/auth/AuthShield';


type AppProviderProps = {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <Router>
              <AuthShield>
                {children}
              </AuthShield>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
    </React.StrictMode>
  )
}

export default AppProvider;
