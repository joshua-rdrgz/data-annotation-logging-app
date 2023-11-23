import { Log } from '@prisma/client';
import { MINUTES_IN_HOUR, MILLISECONDS_IN_MINUTE } from '@/utils/constants';

export const injectEarnings = (logs: Log[]) =>
  logs.map((log) => ({
    ...log,
    earnings: calculateEarnings(log),
  }));

const calculateEarnings = (log: Log) =>
  (log.minutesWorked / MINUTES_IN_HOUR) * log.hourlyRate;

export const millisecondsToCentiseconds = (time: number) => time / 10;

export const millisecondsToNearestMinute = (time: number) =>
  Math.round(time / MILLISECONDS_IN_MINUTE);
