import { Button } from '@/ui/button';
import * as DropdownMenu from '@/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export const LogsRowActions = ({ logId }: { logId: string }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align='end'>
        <DropdownMenu.Item>🎉 Assign Paid Out</DropdownMenu.Item>
        <DropdownMenu.Item>👍🏽 Assign Ready to Pay Out</DropdownMenu.Item>
        <DropdownMenu.Item>✏️ Edit</DropdownMenu.Item>
        <DropdownMenu.Item>🗑️ Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
