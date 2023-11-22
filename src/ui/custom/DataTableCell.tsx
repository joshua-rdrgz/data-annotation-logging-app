import { useState } from 'react';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';

interface DataTableCellProps {
  children: React.ReactNode;
  className?: string;

  // FILTERABLE
  isFilterable?: boolean;
  filterValue?: string;
  filterOnChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const DataTableCell: React.FC<DataTableCellProps> = ({
  children,
  className,

  isFilterable,
  filterValue,
  filterOnChange,
}) => {
  const [filterShow, setFilterShow] = useState(false);

  console.log('filterValue: ', filterValue);

  if (isFilterable) {
    return (
      <div className='m-2 flex flex-col gap-2 items-center'>
        <Button
          variant='ghost'
          className={cn('hover:bg-muted gap-2', className)}
          onClick={() => setFilterShow((prev) => !prev)}
        >
          {children}
          <Filter size={15} />
        </Button>

        {filterShow && (
          <Input
            placeholder='Filter...'
            value={filterValue || ''}
            onChange={filterOnChange}
            className='max-w-sm'
          />
        )}
      </div>
    );
  }

  return <div className={cn('text-center', className)}>{children}</div>;
};
