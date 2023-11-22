import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { DeleteLogItem } from '@/features/logs/actions/DeleteLogItem';
import { EditLogItem } from '@/features/logs/actions/EditLogItem';
import { useLog } from '@/features/logs/hooks/useLog';
import { useLogStatus } from '@/features/logs/hooks/useLogStatus';
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
        <ReadyToPayOutItem logId={logId} />
        <PaidOutItem logId={logId} />
        <EditLogItem logId={logId} onDialogClose={() => setOpen(false)} />
        <DeleteLogItem logId={logId} onDialogClose={() => setOpen(false)} />
      </DMenu.Content>
    </DMenu.Root>
  );
};

function ReadyToPayOutItem({ logId }: { logId: string }) {
  const { log } = useLog(logId);
  const { toggleLogStatus } = useLogStatus(logId);

  return (
    <DMenu.Item onClick={() => toggleLogStatus('READY_TO_PAY_OUT')}>
      {log?.readyToPayOut
        ? '👎🏽 Unassign Ready to Pay Out'
        : '👍🏽 Assign Ready to Pay Out'}
    </DMenu.Item>
  );
}

function PaidOutItem({ logId }: { logId: string }) {
  const { log } = useLog(logId);
  const { toggleLogStatus } = useLogStatus(logId);

  return (
    <DMenu.Item onClick={() => toggleLogStatus('PAY_OUT')}>
      {log?.paidOut ? '😭 Unassign Paid Out' : '🎉 Assign Paid Out'}
    </DMenu.Item>
  );
}
