import { cn } from '@/lib/utils';

interface DataTableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const DataTableCell: React.FC<DataTableCellProps> = ({
  children,
  className,
}) => {
  return <div className={cn('text-center', className)}>{children}</div>;
};
