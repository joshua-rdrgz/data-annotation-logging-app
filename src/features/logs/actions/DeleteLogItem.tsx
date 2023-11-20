import * as D from '@/ui/dialog';
import { DialogItem } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { useDeleteLog } from '@/features/logs/hooks/useDeleteLog';

export const DeleteLogItem = ({ logId }: { logId: string }) => {
  const { deleteLog, isDeletingLog } = useDeleteLog();
  return (
    <DialogItem triggerContent='🗑️ Delete'>
      <D.Header>
        <D.Title className='text-2xl'>Are you sure?</D.Title>
        <D.Description>
          This action cannot be undone. Are you sure you want to permanently
          delete this log?
        </D.Description>
      </D.Header>
      <D.Footer>
        <Button variant='secondary' disabled={isDeletingLog} asChild>
          <D.Close>Cancel</D.Close>
        </Button>
        <Button
          variant='destructive'
          disabled={isDeletingLog}
          onClick={() => deleteLog(logId)}
        >
          Delete
        </Button>
      </D.Footer>
    </DialogItem>
  );
};
