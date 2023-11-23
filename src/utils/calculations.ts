import { Log } from '@prisma/client';
import { MINUTES_IN_HOUR } from '@/utils/constants';

export const injectEarnings = (logs: Log[]) =>
  logs.map((log) => ({
    ...log,
    earnings: calculateEarnings(log),
  }));

const calculateEarnings = (log: Log) =>
  (log.minutesWorked / MINUTES_IN_HOUR) * log.hourlyRate;

export const millisecondsToCentiseconds = (time: number) => time / 10;
