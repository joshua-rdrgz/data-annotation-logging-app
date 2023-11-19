import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/queryKeys';
import { logAPIService } from '@/services/server/log';
import { logClientService } from '@/services/client/log';
import { CreateLog } from '@/features/logs/CreateLog';
import { LogsTable } from '@/features/logs/LogsTable';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.LOGS],
    // logClientService does not work here
    queryFn: logAPIService.getLogs,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function LogsPage() {
  const { data: logs } = useQuery({
    queryKey: [QueryKeys.LOGS],
    queryFn: logClientService.getLogs,
  });

  return (
    <>
      <h1>Logs Page</h1>
      <LogsTable data={logs || []} />
      <CreateLog />
    </>
  );
}
