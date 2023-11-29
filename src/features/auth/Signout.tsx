import { Button } from '@/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const Signout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: '/login',
    });
    toast('See you next time!', {
      icon: '👋🏽',
    });
    router.push(data.url);
  };

  return (
    <Button variant='outline' size='icon' onClick={handleLogout}>
      <LogOut className='h-[1.2rem] w-[1.2rem]' />
    </Button>
  );
};
