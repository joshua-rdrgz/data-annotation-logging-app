import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useQueryClientInstance } from '@/context/query-provider';
import { logClientService } from '@/services/client/log';
import { QueryKeys } from '@/lib/queryKeys';

interface UseEditLogProps {
  logId: string;
  onSuccess?(): void;
}

export const useEditLog = ({ logId, onSuccess }: UseEditLogProps) => {
  const { queryClient } = useQueryClientInstance();

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
      console.error('🔥 ERROR 🔥: ', error.message);
    },
  });

  return {
    editLog,
    isEditingLog,
  };
};
