import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { Icons } from '@/components/ui/icons';
import { useTranslation } from '@/i18n';
import type { TableProps } from '../table';

interface ViewOptionsProps<T> {
  table: TableProps<T>;
}

export const ViewOptions = <T,>({ table }: ViewOptionsProps<T>) => {
  const { t } = useTranslation();

  return (
    <Dropdown.Menu>
      <Dropdown.MenuTrigger asChild>
        <Button className="ml-auto" variant="outline">
          {t('table.filters.columns')} <Icons.ChevronDown />
        </Button>
      </Dropdown.MenuTrigger>

      <Dropdown.MenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => {
            return column.getCanHide();
          })
          .map((column) => {
            return (
              <Dropdown.MenuCheckboxItem
                checked={column.getIsVisible()}
                className="capitalize"
                key={column.id}
                onCheckedChange={(value) => {
                  return column.toggleVisibility(!!value);
                }}
              >
                {column.columnDef.meta?.stringifiedHeader || column.id}
              </Dropdown.MenuCheckboxItem>
            );
          })}
      </Dropdown.MenuContent>
    </Dropdown.Menu>
  );
};
