import { MoreHorizontal } from 'lucide-react';
import { DeleteLogItem } from '@/features/logs/actions/DeleteLogItem';
import * as DMenu from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';

export const LogActions = ({ logId }: { logId: string }) => {
  return (
    <DMenu.Root>
      <DMenu.Trigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DMenu.Trigger>
      <DMenu.Content align='end'>
        <DMenu.Item>🎉 Assign Paid Out</DMenu.Item>
        <DMenu.Item>👍🏽 Assign Ready to Pay Out</DMenu.Item>
        <DMenu.Item>✏️ Edit</DMenu.Item>
        <DeleteLogItem logId={logId} />
      </DMenu.Content>
    </DMenu.Root>
  );
};
