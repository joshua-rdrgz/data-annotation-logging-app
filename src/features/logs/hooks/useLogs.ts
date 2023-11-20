import { useQuery } from '@tanstack/react-query';
import { logClientService } from '@/services/client/log';
import { QueryKeys } from '@/lib/queryKeys';

export const useLogs = () => {
  const { data: logs } = useQuery({
    queryKey: [QueryKeys.LOGS],
    queryFn: logClientService.getLogs,
  });

  return { logs };
};
