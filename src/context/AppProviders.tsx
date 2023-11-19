import { ThemeProvider } from '@/context/theme-provider';
import { QueryClientInstanceProvider } from '@/context/query-provider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientInstanceProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientInstanceProvider>
  );
}
