import { useState } from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type Table as ReactTable,
  type ColumnDef,
  type VisibilityState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import * as Table from '@/ui/table';
import { DTColumnVisibility } from '@/ui/custom/DTColumnVisibility';
import { DTPagination } from '@/ui/custom/DTPagination';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  defaultFilterComponent?({ table }: { table: ReactTable<TData> }): JSX.Element;
  columnVisibility?: VisibilityState;
}

export function DataTable<TData>({
  data,
  columns,
  defaultFilterComponent: DefaultFilterComponent,
  columnVisibility: initialColumnVisibility = {},
}: DataTableProps<TData>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,

    state: {
      columnVisibility,
      columnFilters,
    },

    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <>
      <div className='flex items-center py-4'>
        {DefaultFilterComponent ? (
          <DefaultFilterComponent table={table} />
        ) : (
          <></>
        )}
        <DTColumnVisibility table={table} />
      </div>
      <div className='rounded-md border'>
        <Table.Root>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Head key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.Head>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
      <DTPagination table={table} />
    </>
  );
}
