import { Log } from '@prisma/client';

const ONE_HOUR = 60;

export const injectEarnings = (logs: Log[]) =>
  logs.map((log) => ({
    ...log,
    earnings: calculateEarnings(log),
  }));

const calculateEarnings = (log: Log) =>
  (log.minutesWorked / ONE_HOUR) * log.hourlyRate;
