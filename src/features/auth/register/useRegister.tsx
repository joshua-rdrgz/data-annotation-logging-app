import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { authClientService } from '@/services/client/auth';

export const useRegister = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: authClientService.register,
    onSuccess() {
      toast.success('Successfully created user, please login!', {
        icon: '👍🏽',
      });
      router.replace('/login');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return {
    register: mutate,
    isRegistering: isPending,
  };
};
