import type { AvailableRoutes } from '@/config/router';
import { useTranslation } from '@/i18n';
import { flexRender, Table, type TableProps } from '../table';
import { Pagination } from './pagination';
import { SearchTextInput } from './search-text-input';
import { ViewOptions } from './view-options';

interface BaseDataTableProps<T> {
  isLoading?: boolean;
  table: TableProps<T>;
  withColumnVisibility?: boolean;
}

interface DataTablePropsWithSearch {
  withSearch: true;
  path: AvailableRoutes;
}

interface DataTablePropsWithoutSearch {
  withSearch?: false;
  path?: never;
}

type DataTableProps<T> = BaseDataTableProps<T> &
  (DataTablePropsWithSearch | DataTablePropsWithoutSearch);

export const DataTable = <T,>({
  isLoading,
  path,
  table,
  withColumnVisibility = false,
  withSearch = false,
}: DataTableProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="flex items-center gap-x-4">
        {withSearch && path ? <SearchTextInput path={path} /> : null}

        {withColumnVisibility ? <ViewOptions table={table} /> : null}
      </div>

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
          {isLoading ? (
            <Table.Skeleton
              columnsLength={table.getAllColumns().length}
              pageSize={table.getState().pagination.pageSize}
            />
          ) : null}

          {!isLoading && table.getRowModel().rows?.length ? (
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

      {table.options.manualPagination ? <Pagination isLoading={isLoading} table={table} /> : null}
    </div>
  );
};
