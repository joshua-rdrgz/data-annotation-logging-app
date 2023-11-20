import { useQueryClientInstance } from '@/context/query-provider';
import { QueryKeys } from '@/lib/queryKeys';
import { logClientService } from '@/services/client/log';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useDeleteLog = () => {
  const { queryClient } = useQueryClientInstance();

  const { mutate: deleteLog, isPending: isDeletingLog } = useMutation({
    mutationFn: logClientService.deleteLog,
    onSuccess() {
      toast.success('Log successfully deleted.', {
        icon: '🗑️',
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LOGS] });
    },
    onError(error) {
      toast.error('Uh oh, something went wrong....', {
        icon: '💥',
      });
      console.error('🔥 ERROR 🔥: ', error.message);
    },
  });

  return {
    deleteLog,
    isDeletingLog,
  };
};
