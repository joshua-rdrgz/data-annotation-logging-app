import { useState } from 'react';
import { CreateStopwatchLogForm } from '@/features/stopwatch/forms/CreateStopwatchLogForm';
import { Dialog } from '@/ui/custom/Dialog';
import * as D from '@/ui/dialog';
import { Button } from '@/ui/button';
import { useStopwatchStore } from '@/store/useStopwatchStore';
import { millisecondsToNearestMinute } from '@/utils/calculations';

interface StopwatchFinishSequenceProps {
  onInitialize(): void;
}

export const StopwatchFinishSequence: React.FC<
  StopwatchFinishSequenceProps
> = ({ onInitialize }) => {
  const [open, setOpen] = useState(false);
  const time = useStopwatchStore((state) => state.values.time);
  const resetStopwatch = useStopwatchStore((state) => state.methods.reset);

  return (
    <Dialog
      controlled
      open={open}
      onOpenChange={setOpen}
      triggerContent={
        <Button
          className='text-lg'
          onClick={onInitialize}
          disabled={millisecondsToNearestMinute(time) < 1}
        >
          🎊 Finish
        </Button>
      }
    >
      <D.Header>
        <D.Title>🎉 Ready to Finish Up?</D.Title>
        <D.Description>
          Fill out the form to add your time to your logs.
        </D.Description>
        <CreateStopwatchLogForm
          onFormSuccess={() => {
            setOpen(false);
            resetStopwatch();
          }}
        />
      </D.Header>
    </Dialog>
  );
};
