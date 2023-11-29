import { type AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { HydrationBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { AppProviders } from '@/context/AppProviders';
import { AppLayout } from '@/ui/custom/AppLayout';
import { AuthLayout } from '@/ui/custom/AuthLayout';

import './globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const renderPage = () => {
    if (pathname === '/register' || pathname === '/login') {
      return (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      );
    }

    if (pathname === '/404') {
      return <Component {...pageProps} />;
    }

    return (
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    );
  };

  return (
    <AppProviders pageProps={pageProps}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        {renderPage()}
        <ReactQueryDevtools initialIsOpen={false} />
      </HydrationBoundary>
      <Toaster />
    </AppProviders>
  );
}
