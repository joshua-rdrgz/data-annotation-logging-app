import { authClientService } from '@/services/client/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: authClientService.login,
    onSuccess() {
      toast.success('Successfully logged in.  Welcome back!', {
        icon: '👋🏽',
      });
      router.push('/dashboard');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return {
    login: mutate,
    isLoggingIn: isPending,
  };
};
