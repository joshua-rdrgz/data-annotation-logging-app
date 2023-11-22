import { cva } from 'class-variance-authority';
import { Column, type ColumnDef } from '@tanstack/react-table';
import { LogWithEarnings } from '@/store/createLogStore';
import { LogActions } from '@/features/logs/actions/LogActions';
import { LogsDefaultFilter } from '@/features/logs/LogsDefaultFilter';
import { DataTable } from '@/ui/custom/DataTable';
import { DataTableCell } from '@/ui/custom/DataTableCell';
import { currency } from '@/lib/utils';

const createHeaderCell = (
  child: any,
  {
    className,
    column,
  }: { className?: string; column?: Column<LogWithEarnings> } = {}
) => {
  const shouldFilter = child === 'Date' || child === 'Project Name';
  return (
    <DataTableCell
      isFilterable={shouldFilter}
      filterValue={column?.getFilterValue() as string}
      filterOnChange={(e) => column?.setFilterValue(e.target.value)}
      className={className}
    >
      {child}
    </DataTableCell>
  );
};

const createContentCell = (child: any, className?: string) => (
  <DataTableCell className={className}>{child}</DataTableCell>
);

const tableCellBoolStyles = cva(
  'text-slate-200 dark:text-slate-800 rounded-sm p-2 font-bold',
  {
    variants: {
      isReady: {
        true: 'bg-green-800 dark:bg-green-200',
        false: 'bg-red-800 dark:bg-red-200',
      },
    },
    defaultVariants: {
      isReady: false,
    },
  }
);

const LOGS_COLUMNS: ColumnDef<LogWithEarnings>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => createHeaderCell('Date', { column }),
    cell: ({ row }) => createContentCell(row.getValue('date')),
  },
  {
    accessorKey: 'projectName',
    header: ({ column }) => createHeaderCell('Project Name', { column }),
    cell: ({ row }) => createContentCell(row.getValue('projectName')),
  },
  {
    accessorKey: 'tasksCompleted',
    header: ({ column }) => createHeaderCell('Tasks Completed'),
    cell: ({ row }) => createContentCell(row.getValue('tasksCompleted')),
  },
  {
    accessorKey: 'minutesWorked',
    header: ({ column }) => createHeaderCell('Mins Worked'),
    cell: ({ row }) => createContentCell(row.getValue('minutesWorked')),
  },
  {
    accessorKey: 'hourlyRate',
    header: ({ column }) => createHeaderCell('$ Per Hour'),
    cell: ({ row }) => createContentCell(currency(row.getValue('hourlyRate'))),
  },
  {
    accessorKey: 'earnings',
    header: ({ column }) => createHeaderCell('$ Earned'),
    cell: ({ row }) => createContentCell(currency(row.getValue('earnings'))),
  },
  {
    accessorKey: 'readyToPayOut',
    header: ({ column }) => createHeaderCell('Ready To Pay Out?'),
    cell: ({ row }) => {
      const isReady = row.getValue('readyToPayOut') as boolean;
      const cellContent = isReady ? 'YES' : 'NO';
      return createContentCell(cellContent, tableCellBoolStyles({ isReady }));
    },
  },
  {
    accessorKey: 'paidOut',
    header: ({ column }) => createHeaderCell('Paid Out?'),
    cell: ({ row }) => {
      const isReady = row.getValue('paidOut') as boolean;
      const cellContent = isReady ? 'YES' : 'NO';
      return createContentCell(cellContent, tableCellBoolStyles({ isReady }));
    },
  },
  {
    id: 'actions',
    header: ({ column }) => createHeaderCell('Actions'),
    cell: ({ row }) => {
      const logId = row.original.id;

      return createContentCell(<LogActions logId={logId} />);
    },
    enableHiding: false,
  },
];

interface LogsTableProps {
  data: LogWithEarnings[];
}

export const LogsTable = ({ data }: LogsTableProps) => {
  return (
    <DataTable
      data={data}
      columns={LOGS_COLUMNS}
      defaultFilterComponent={LogsDefaultFilter}
      columnVisibility={{
        tasksCompleted: false,
        minutesWorked: false,
        hourlyRate: false,
      }}
    />
  );
};
