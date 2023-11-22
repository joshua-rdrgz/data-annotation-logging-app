import { useState } from 'react';
import { ThemeProvider } from '@/context/theme-provider';
import { LogStoreProvider } from '@/context/log-store-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClientOptions } from '@/utils/constants';

interface AppProvidersProps {
  children: React.ReactNode;
  pageProps?: any;
}

export function AppProviders({ children, pageProps }: AppProvidersProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClient}>
      <LogStoreProvider logs={pageProps?.initialLogs || []}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </LogStoreProvider>
    </QueryClientProvider>
  );
}
