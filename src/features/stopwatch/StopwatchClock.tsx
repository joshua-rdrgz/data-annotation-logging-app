import {
  millisecondsToHours,
  millisecondsToMinutes,
  millisecondsToSeconds,
} from 'date-fns';
import {
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
  MILLISECONDS_IN_CENTISECOND,
} from '@/utils/constants';
import { millisecondsToCentiseconds } from '@/utils/calculations';
import { useStopwatchStore } from '@/store/useStopwatchStore';

export const StopwatchClock = () => {
  const time = useStopwatchStore((state) => state.values.time);
  const calculations = {
    hours: ('0' + Math.floor(millisecondsToHours(time) % HOURS_IN_DAY)).slice(
      -2
    ),
    minutes: (
      '0' + Math.floor(millisecondsToMinutes(time) % MINUTES_IN_HOUR)
    ).slice(-2),
    seconds: (
      '0' + Math.floor(millisecondsToSeconds(time) % SECONDS_IN_MINUTE)
    ).slice(-2),
    centiseconds: (
      '0' +
      (millisecondsToCentiseconds(time) % MILLISECONDS_IN_CENTISECOND)
    ).slice(-2),
  };

  return (
    <div className='flex justify-center items-center bg-secondary w-min mx-auto p-3 rounded-sm shadow-md'>
      {+calculations.hours !== 0 ? (
        <>
          <div className='text-6xl font-medium w-[75px]'>
            {calculations.hours}
          </div>
          <span className='text-6xl font-medium'>:</span>
        </>
      ) : (
        <></>
      )}
      <div className='text-6xl font-medium w-[75px]'>
        {calculations.minutes}
      </div>
      <span className='text-6xl font-medium'>:</span>
      <div className='text-6xl font-medium w-[75px]'>
        {calculations.seconds}
      </div>
      <span className='text-6xl font-medium'>.</span>
      <div className='text-6xl font-medium w-[75px]'>
        {calculations.centiseconds}
      </div>
    </div>
  );
};
