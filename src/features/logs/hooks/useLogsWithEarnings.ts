import { useEffect } from 'react';
import { useLogStore } from '@/context/log-store-provider';
import { useLogs } from '@/features/logs/hooks/useLogs';

export const useLogsWithEarnings = () => {
  const { logs } = useLogs();
  const store = useLogStore((state) => state);

  useEffect(() => {
    if (logs) {
      store.updateLogs(logs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs]);

  console.log('logs from zustand: ', store.logs);

  return {
    logs: store.logs,
  };
};
