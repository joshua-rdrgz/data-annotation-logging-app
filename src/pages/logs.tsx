import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/queryKeys';
import { logClientService } from '@/services/client/log';
import { CreateLog } from '@/features/logs/CreateLog';
import { LogsTable } from '@/features/logs/LogsTable';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.LOGS],
    queryFn: logClientService.getLogs,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function DailyLogsPage() {
  const { data: dailyLogs } = useQuery({
    queryKey: [QueryKeys.LOGS],
    queryFn: logClientService.getLogs,
  });

  return (
    <>
      <h1>DailyLogs Page</h1>
      <LogsTable data={dailyLogs || []} />
      <CreateLog />
    </>
  );
}
