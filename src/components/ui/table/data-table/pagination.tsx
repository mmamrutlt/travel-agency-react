import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useTranslation } from '@/i18n';
import type { TableProps } from '../table';

interface PaginationProps<T> {
  table: TableProps<T>;
  isLoading?: boolean;
}

export const Pagination = <T,>({ isLoading = false, table }: PaginationProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="text-muted-foreground text-sm">
        {isLoading ? <Icons.LoaderCircle className="animate-spin" /> : null}

        {!isLoading && table.getPageCount()
          ? t('table.pagination.pageCount', {
              currentPage: table.getState().pagination.pageIndex + 1,
              totalPages: table.getPageCount().toLocaleString(),
            })
          : null}
      </div>

      <div className="space-x-2">
        <Button
          disabled={!table.getCanPreviousPage() || isLoading}
          onClick={() => {
            return table.previousPage();
          }}
          size="sm"
          variant="outline"
        >
          {t('table.pagination.buttons.previous')}
        </Button>

        <Button
          disabled={!table.getCanNextPage() || isLoading}
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
  );
};
