import { Input } from '@/ui/input';
import { type Table } from '@tanstack/react-table';
import { type LogWithEarnings } from '@/store/createLogStore';

export const LogsDefaultFilter = ({
  table,
}: {
  table: Table<LogWithEarnings>;
}) => {
  return (
    <div className='flex items-center py-4'>
      <Input
        placeholder='Filter by project...'
        value={
          (table.getColumn('projectName')?.getFilterValue() as string) ?? ''
        }
        onChange={(event) =>
          table.getColumn('projectName')?.setFilterValue(event.target.value)
        }
        className='max-w-sm md:w-96'
      />
    </div>
  );
};
