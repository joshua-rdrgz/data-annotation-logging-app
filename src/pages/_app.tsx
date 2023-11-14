import { AppProviders } from '@/context/AppProviders';
import { AppLayout } from '@/ui/custom/AppLayout';
import { type AppProps } from 'next/app';
import './globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AppProviders>
  );
}
