import { QueryKeys } from '@/lib/queryKeys';
import { logClientService } from '@/services/client/log';
import { useQuery } from '@tanstack/react-query';

export const useLog = (logId: string) => {
  const { data: log, isLoading: isLoadingLog } = useQuery({
    queryKey: [QueryKeys.LOG, logId],
    queryFn: () => logClientService.getLog(logId),
  });

  return {
    log,
    isLoadingLog,
  };
};
