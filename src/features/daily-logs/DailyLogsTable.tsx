import { type ColumnDef } from '@tanstack/react-table';
import { DailyLog } from '@prisma/client';
import { DataTable } from '@/ui/custom/DataTable';

const DAILY_LOGS_COLUMNS: ColumnDef<DailyLog>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => row.getValue('date'),
  },
  {
    accessorKey: 'name',
    header: 'Project Name',
    cell: ({ row }) => row.getValue('name'),
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

interface DailyLogsTableProps {
  data: DailyLog[];
}

export const DailyLogsTable = ({ data }: DailyLogsTableProps) => {
  return <DataTable data={data} columns={DAILY_LOGS_COLUMNS} />;
};
