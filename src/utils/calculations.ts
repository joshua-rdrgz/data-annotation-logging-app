import { Log } from '@prisma/client';
import { minutesToHours } from 'date-fns';
import {
  MINUTES_IN_HOUR,
  MILLISECONDS_IN_MINUTE,
  HOURS_IN_DAY,
} from '@/utils/constants';
import { currency } from '@/lib/utils';

export const injectEarnings = (logs: Log[]) =>
  logs.map((log) => ({
    ...log,
    earnings: calculateEarnings(log),
  }));

const calculateEarnings = (log: Log) =>
  (log.minutesWorked / MINUTES_IN_HOUR) * log.hourlyRate;

export const calculateBareEarnings = (
  minutesWorked: number,
  hourlyRate: number
) => currency((minutesWorked / MINUTES_IN_HOUR) * hourlyRate);

export const millisecondsToCentiseconds = (milliseconds: number) =>
  milliseconds / 10;

export const millisecondsToNearestMinute = (milliseconds: number) =>
  Math.round(milliseconds / MILLISECONDS_IN_MINUTE);

export const computeTimeStringFromMinutes = (minutes: number) => {
  const hours = (
    '0' + Math.floor(minutesToHours(minutes) % HOURS_IN_DAY)
  ).slice(-2);
  const remainingMinutes = ('0' + Math.floor(minutes % MINUTES_IN_HOUR)).slice(
    -2
  );

  if (+hours === 0) {
    return `${minutes} mins`;
  }

  return `${hours} hrs : ${remainingMinutes} mins`;
};
