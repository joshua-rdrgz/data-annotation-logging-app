import { useEffect, useState } from 'react';
import * as Card from '@/ui/card';
import { Button } from '@/ui/button';
import { cva } from 'class-variance-authority';
import { StopwatchClock } from './StopwatchClock';

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
  const [time, setTime] = useState(0);
  const [timeIsRunning, setTimeIsRunning] = useState(false);
  const [timeHasStarted, setTimeHasStarted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timeIsRunning && time === 0) {
      setTimeHasStarted(true);
    }

    if (timeIsRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(interval);
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
        <StopwatchClock time={time} />
      </Card.Content>
      <Card.Footer className='justify-center gap-5'>
        <Button
          className={startStopBtnStyles({ timeIsRunning })}
          onClick={() => setTimeIsRunning((prev) => !prev)}
        >
          {timeIsRunning ? '🛑 Pause' : '🏁 Start'}
        </Button>
        {timeHasStarted && (
          <Button
            className='text-lg'
            onClick={() => {
              setTimeIsRunning(false);
              console.log('Time to finish up!');
            }}
          >
            Finish
          </Button>
        )}
      </Card.Footer>
    </Card.Root>
  );
};
