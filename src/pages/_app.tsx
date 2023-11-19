import { type AppProps } from 'next/app';
import { HydrationBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProviders } from '@/context/AppProviders';
import { AppLayout } from '@/ui/custom/AppLayout';

import './globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </HydrationBoundary>
    </AppProviders>
  );
}
