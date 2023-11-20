import { type Table } from '@tanstack/react-table';
import * as DropdownMenu from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';

export function DTColumnVisibility<TData>({ table }: { table: Table<TData> }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant='outline' className='ml-auto'>
          Columns
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align='end'>
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenu.CheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenu.CheckboxItem>
            );
          })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
