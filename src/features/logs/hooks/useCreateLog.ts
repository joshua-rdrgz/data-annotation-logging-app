import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useQueryClientInstance } from '@/context/query-provider';
import { logClientService } from '@/services/client/log';
import { QueryKeys } from '@/lib/queryKeys';

export const useCreateLog = ({ onSuccess }: { onSuccess?(): void }) => {
  const { queryClient } = useQueryClientInstance();

  const { mutate: createLog, isPending: isCreatingLog } = useMutation({
    mutationFn: logClientService.createLog,
    onSuccess() {
      toast.success('Log successfully created', {
        icon: '🎉',
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LOGS] });
      onSuccess?.();
    },
    onError(error) {
      toast.error('Uh oh, something went wrong....', {
        icon: '💥',
      });
      console.error('🔥 ERROR 🔥: ', error.message);
    },
  });

  return {
    createLog,
    isCreatingLog,
  };
};
