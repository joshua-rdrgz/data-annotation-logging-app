import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { DeleteLogItem } from '@/features/logs/actions/DeleteLogItem';
import { EditLogItem } from '@/features/logs/actions/EditLogItem';
import * as DMenu from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';

export const LogActions = ({ logId }: { logId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <DMenu.Root open={open} onOpenChange={setOpen}>
      <DMenu.Trigger asChild>
        <Button
          variant='ghost'
          className='h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground'
        >
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DMenu.Trigger>
      <DMenu.Content align='end'>
        <DMenu.Item>🎉 Assign Paid Out</DMenu.Item>
        <DMenu.Item>👍🏽 Assign Ready to Pay Out</DMenu.Item>
        <EditLogItem logId={logId} onDialogClose={() => setOpen(false)} />
        <DeleteLogItem logId={logId} onDialogClose={() => setOpen(false)} />
      </DMenu.Content>
    </DMenu.Root>
  );
};
