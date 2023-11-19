import { type ColumnDef } from '@tanstack/react-table';
import { Log } from '@prisma/client';
import { DataTable } from '@/ui/custom/DataTable';

const LOGS_COLUMNS: ColumnDef<Log>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => row.getValue('date'),
  },
  {
    accessorKey: 'projectName',
    header: 'Project Name',
    cell: ({ row }) => row.getValue('projectName'),
  },
  {
    accessorKey: 'tasksCompleted',
    header: 'Tasks Completed',
    cell: ({ row }) => row.getValue('tasksCompleted'),
  },
  {
    accessorKey: 'minutesWorked',
    header: 'Minutes Worked',
    cell: ({ row }) => row.getValue('minutesWorked'),
  },
  {
    accessorKey: 'hourlyRate',
    header: 'Hourly Rate',
    cell: ({ row }) => row.getValue('hourlyRate'),
  },
  {
    accessorKey: 'paidOut',
    header: 'Paid Out?',
    cell: ({ row }) => (row.getValue('paidOut') ? 'YES' : 'NO'),
  },
];

interface LogsTableProps {
  data: Log[];
}

export const LogsTable = ({ data }: LogsTableProps) => {
  return <DataTable data={data} columns={LOGS_COLUMNS} />;
};
