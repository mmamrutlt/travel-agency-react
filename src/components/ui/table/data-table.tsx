import type { Table as TableProps } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n';
import { Table } from './table';

interface DataTableProps<T> {
  isLoadingData?: boolean;
  table: TableProps<T>;
  withPagination?: boolean;
}

export const DataTable = <T,>({
  isLoadingData,
  table,
  withPagination = true,
}: DataTableProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table.Root>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <Table.Row key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Table.Head key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </Table.Head>
                    );
                  })}
                </Table.Row>
              );
            })}
          </Table.Header>

          <Table.Body>
            {isLoadingData ? (
              <Table.Skeleton
                columnsLength={table.getAllColumns().length}
                pageSize={table.getState().pagination.pageSize}
              />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <Table.Row key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Table.Cell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell className="h-24 text-center" colSpan={table.getAllColumns().length}>
                  {t('table.noResults')}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>

      {withPagination ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground text-sm">
            {t('table.pagination.pageCount', {
              currentPage: table.getState().pagination.pageIndex + 1,
              totalPages: table.getPageCount().toLocaleString(),
            })}
          </div>

          <div className="space-x-2">
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => {
                return table.previousPage();
              }}
              size="sm"
              variant="outline"
            >
              {t('table.pagination.buttons.previous')}
            </Button>

            <Button
              disabled={!table.getCanNextPage()}
              onClick={() => {
                return table.nextPage();
              }}
              size="sm"
              variant="outline"
            >
              {t('table.pagination.buttons.next')}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
