import { useState } from 'react';
import { CreateLogForm } from '@/features/logs/form/CreateLogForm';
import * as D from '@/ui/dialog';
import { Dialog } from '@/ui/custom/Dialog';
import { Button } from '@/ui/button';

export const CreateLog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      controlled
      open={open}
      onOpenChange={setOpen}
      triggerContent={<Button className='ml-auto'>🔨 Add New Log</Button>}
    >
      <D.Header>
        <D.Title>Add a New Log</D.Title>
        <D.Description>Fill out the form to add a new work log.</D.Description>
      </D.Header>
      <CreateLogForm onFormSuccess={() => setOpen(false)} />
    </Dialog>
  );
};
