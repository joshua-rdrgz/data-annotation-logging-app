import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { logClientService } from '@/services/client/log';
import { QueryKeys } from '@/lib/queryKeys';

interface UseEditLogOptions {
  onSuccess?(): void;
}

export const useEditLog = (
  logId: string,
  { onSuccess }: UseEditLogOptions = {}
) => {
  const queryClient = useQueryClient();

  const { mutate: editLog, isPending: isEditingLog } = useMutation({
    mutationFn: logClientService.editLog,
    onSuccess() {
      toast.success('Log successfully updated', {
        icon: '👍🏽',
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LOG, logId] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LOGS] });
      onSuccess?.();
    },
    onError(error) {
      toast.error('Uh oh, something went wrong....', {
        icon: '💥',
      });
      console.error('🔥 ERROR FROM useEditLog 🔥: ', error.message);
    },
  });

  return {
    editLog,
    isEditingLog,
  };
};
