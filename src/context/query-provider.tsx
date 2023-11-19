import React, { useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const QueryClientInstanceContext = React.createContext<{
  queryClient: QueryClient | null;
}>({
  queryClient: null,
});

export const QueryClientInstanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientInstanceContext.Provider value={{ queryClient }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </QueryClientInstanceContext.Provider>
  );
};

export const useQueryClientInstance = (): { queryClient: QueryClient } => {
  const { queryClient } = useContext(QueryClientInstanceContext);

  if (!queryClient) {
    throw new Error(
      'Must use <useQueryClientInstance> within <QueryClientInstanceProvider>'
    );
  }

  return { queryClient };
};
