import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { dailyLogClientService } from '@/services/client/dailyLog';
import { CreateDailyLog } from '@/features/daily-logs/CreateDailyLog';
import { DailyLogsTable } from '@/features/daily-logs/DailyLogsTable';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['daily-logs'],
    queryFn: dailyLogClientService.getDailyLogs,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function DailyLogsPage() {
  const { data: dailyLogs } = useQuery({
    queryKey: ['daily-logs'],
    queryFn: dailyLogClientService.getDailyLogs,
  });

  return (
    <>
      <h1>DailyLogs Page</h1>
      <DailyLogsTable data={dailyLogs || []} />
      <CreateDailyLog />
    </>
  );
}
