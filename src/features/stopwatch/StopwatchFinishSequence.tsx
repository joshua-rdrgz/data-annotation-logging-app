import { useState } from 'react';
import { CreateStopwatchLogForm } from '@/features/stopwatch/forms/CreateStopwatchLogForm';
import { Dialog } from '@/ui/custom/Dialog';
import * as D from '@/ui/dialog';
import { Button } from '@/ui/button';

interface StopwatchFinishSequenceProps {
  onInitialize(): void;
}

export const StopwatchFinishSequence: React.FC<
  StopwatchFinishSequenceProps
> = ({ onInitialize }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      controlled
      open={open}
      onOpenChange={setOpen}
      triggerContent={
        <Button className='text-lg' onClick={onInitialize}>
          Finish
        </Button>
      }
    >
      <D.Header>
        <D.Title>🎉 Ready to Finish Up?</D.Title>
        <D.Description>
          Fill out the form to add your time to your logs.
        </D.Description>
        <CreateStopwatchLogForm />
      </D.Header>
    </Dialog>
  );
};
