import { useState } from 'react';
import * as D from '@/ui/dialog';
import { DialogItem } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { useDeleteLog } from '@/features/logs/hooks/useDeleteLog';

interface DeleteLogItemProps {
  logId: string;
  onDialogClose?(): void;
}

export const DeleteLogItem: React.FC<DeleteLogItemProps> = ({
  logId,
  onDialogClose,
}) => {
  const [open, setOpen] = useState(false);
  const { deleteLog, isDeletingLog } = useDeleteLog();
  return (
    <DialogItem open={open} onOpenChange={setOpen} triggerContent='🗑️ Delete'>
      <D.Header>
        <D.Title className='text-2xl'>Are you sure?</D.Title>
        <D.Description>
          This action cannot be undone. Are you sure you want to permanently
          delete this log?
        </D.Description>
      </D.Header>
      <D.Footer>
        <Button variant='secondary' disabled={isDeletingLog} asChild>
          <D.Close onClick={() => onDialogClose?.()}>Cancel</D.Close>
        </Button>
        <Button
          variant='destructive'
          disabled={isDeletingLog}
          onClick={() => {
            deleteLog(logId);
            setOpen(false);
            onDialogClose?.();
          }}
        >
          Delete
        </Button>
      </D.Footer>
    </DialogItem>
  );
};
