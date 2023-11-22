import toast from 'react-hot-toast';
import { QueryKeys } from '@/lib/queryKeys';
import { logClientService } from '@/services/client/log';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteLog = () => {
  const queryClient = useQueryClient();

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
