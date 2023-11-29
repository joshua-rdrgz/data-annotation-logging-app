import Link from 'next/link';
import { ModeToggle } from '@/ui/mode-toggle';
import { Signout } from '@/features/auth/Signout';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className='grid grid-cols-[13rem_1fr] grid-rows-[auto_1fr] h-screen'>
      <header className='bg-background flex items-center gap-6 justify-end py-2 pr-3'>
        <ModeToggle />
        <Signout />
      </header>
      <aside className='row-span-full pt-5 px-4 flex flex-col gap-12 bg-background'>
        <nav>
          <ul className='flex flex-col gap-6'>
            <li className='shadow-sm'>
              <Link href='/dashboard'>Dashboard</Link>
            </li>
            <li className='shadow-sm'>
              <Link href='/track'>Track Time</Link>
            </li>
            <li className='shadow-sm'>
              <Link href='/logs'>Logs</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className='bg-secondary overflow-auto px-6 py-4'>
        <div className='max-w-5xl mx-auto flex flex-col gap-6'>{children}</div>
      </main>
    </div>
  );
};
