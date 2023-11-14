import type { InferGetStaticPropsType } from 'next';
import prisma from '@/lib/prisma';
import { CreateDailyLog } from '@/features/daily-logs/CreateDailyLog';
import { DailyLogsTable } from '@/features/daily-logs/DailyLogsTable';

export const getStaticProps = async () => {
  return {
    props: {
      dailyLogs: await prisma.dailyLog.findMany(),
    },
  };
};

export default function DailyLogsPage({
  dailyLogs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>DailyLogs Page</h1>
      <DailyLogsTable data={dailyLogs} />
      <CreateDailyLog />
    </div>
  );
}
