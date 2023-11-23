import { QueryClient, dehydrate } from '@tanstack/react-query';
import { queryClientOptions } from '@/utils/constants';
import { logAPIService } from '@/services/server/log';
import { CreateLog } from '@/features/logs/CreateLog';
import { LogsTable } from '@/features/logs/LogsTable';
import { useLogsWithEarnings } from '@/features/logs/hooks/useLogsWithEarnings';
import { QueryKeys } from '@/lib/queryKeys';
import { injectEarnings } from '@/utils/calculations';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient(queryClientOptions);

  const logs = await queryClient.fetchQuery({
    queryKey: [QueryKeys.LOGS],
    queryFn: logAPIService.getLogs,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialLogs: injectEarnings(logs),
    },
  };
};

export default function LogsPage() {
  const { logs } = useLogsWithEarnings();

  return (
    <>
      <h1 className='mx-auto text-3xl font-bold mt-7'>My Logs</h1>
      <LogsTable data={logs || []} />
      <CreateLog />
    </>
  );
}
