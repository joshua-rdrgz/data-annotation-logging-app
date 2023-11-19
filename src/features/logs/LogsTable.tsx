import { type ColumnDef } from '@tanstack/react-table';
import { Log } from '@prisma/client';
import { DataTable } from '@/ui/custom/DataTable';
import { DataTableCell } from '@/ui/custom/DataTableCell';
import { currency } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { LogsRowActions } from './LogsRowActions';

const createHeaderCell = (child: any, className?: string) => {
  return function displayCell() {
    return <DataTableCell className={className}>{child}</DataTableCell>;
  };
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

const LOGS_COLUMNS: ColumnDef<Log>[] = [
  {
    accessorKey: 'date',
    header: createHeaderCell('Date'),
    cell: ({ row }) => createContentCell(row.getValue('date')),
  },
  {
    accessorKey: 'projectName',
    header: createHeaderCell('Project Name'),
    cell: ({ row }) => createContentCell(row.getValue('projectName')),
  },
  {
    accessorKey: 'tasksCompleted',
    header: createHeaderCell('Tasks Completed'),
    cell: ({ row }) => createContentCell(row.getValue('tasksCompleted')),
  },
  {
    accessorKey: 'minutesWorked',
    header: createHeaderCell('Mins Worked'),
    cell: ({ row }) => createContentCell(row.getValue('minutesWorked')),
  },
  {
    accessorKey: 'hourlyRate',
    header: createHeaderCell('$ Per Hour'),
    cell: ({ row }) => createContentCell(currency(row.getValue('hourlyRate'))),
  },
  {
    accessorKey: 'readyToPayOut',
    header: createHeaderCell('Ready To Pay Out?'),
    cell: ({ row }) => {
      const isReady = row.getValue('readyToPayOut') as boolean;
      const cellContent = isReady ? 'YES' : 'NO';
      return createContentCell(cellContent, tableCellBoolStyles({ isReady }));
    },
  },
  {
    accessorKey: 'paidOut',
    header: createHeaderCell('Paid Out?'),
    cell: ({ row }) => {
      const isReady = row.getValue('paidOut') as boolean;
      const cellContent = isReady ? 'YES' : 'NO';
      return createContentCell(cellContent, tableCellBoolStyles({ isReady }));
    },
  },
  {
    id: 'actions',
    header: createHeaderCell('Actions'),
    cell: ({ row }) => {
      const logId = row.original.id;

      return createContentCell(<LogsRowActions logId={logId} />);
    },
  },
];

interface LogsTableProps {
  data: Log[];
}

export const LogsTable = ({ data }: LogsTableProps) => {
  return <DataTable data={data} columns={LOGS_COLUMNS} />;
};
