import { useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { useStopwatchStore } from '@/store/useStopwatchStore';
import { StopwatchClock } from '@/features/stopwatch/StopwatchClock';
import { StopwatchFinishSequence } from '@/features/stopwatch/StopwatchFinishSequence';
import * as Card from '@/ui/card';
import { Button } from '@/ui/button';

const startStopBtnStyles = cva('text-lg', {
  variants: {
    timeIsRunning: {
      true: 'bg-red-600 hover:bg-red-700 dark:bg-red-300 dark:hover:bg-red-400',
      false:
        'bg-green-600 hover:bg-green-700 dark:bg-green-300 dark:hover:bg-green-400',
    },
  },
});

export const Stopwatch = () => {
  const { time, timeIsRunning, timeHasStarted } = useStopwatchStore(
    (state) => state.values
  );
  const { setTime, setTimeIsRunning, toggleTimeIsRunning, setTimeHasStarted } =
    useStopwatchStore((state) => state.methods);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timeIsRunning && time === 0) {
      setTimeHasStarted(true);
    }

    if (timeIsRunning) {
      interval = setInterval(() => {
        setTime(time + 10);
      }, 10);
    }

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, timeIsRunning]);

  return (
    <Card.Root as='section'>
      <Card.Header className='items-center'>
        <Card.Title as='h2'>Current Time</Card.Title>
        <Card.Description>
          This keeps track of your current timed log. Click &quot;Finish&quot;
          to finish tracking this log!
        </Card.Description>
      </Card.Header>
      <Card.Content className='my-2'>
        <StopwatchClock />
      </Card.Content>
      <Card.Footer className='justify-center gap-5'>
        <Button
          className={startStopBtnStyles({ timeIsRunning })}
          onClick={() => toggleTimeIsRunning()}
        >
          {timeIsRunning ? '🛑 Pause' : '🏁 Start'}
        </Button>
        {timeHasStarted && (
          <StopwatchFinishSequence
            onInitialize={() => setTimeIsRunning(false)}
          />
        )}
      </Card.Footer>
    </Card.Root>
  );
};
