import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from './data-table';
import { createColumnHelper, useTable } from './table';

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/UI/Table',
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

const MOCK_DATA: Person[] = [
  // cspell: disable
  { firstName: 'Andreane', lastName: 'Nicolas', age: 6 },
  { firstName: 'Easter', lastName: 'Gleichner', age: 11 },
  { firstName: 'Nova', lastName: 'Dibbert', age: 22 },
  { firstName: 'Jairo', lastName: 'Beer', age: 25 },
  { firstName: 'Emelia', lastName: 'Cole', age: 31 },
  { firstName: 'Mylene', lastName: 'Kessler', age: 7 },
  { firstName: 'Jeffry', lastName: 'Abshire', age: 24 },
  { firstName: 'Cade', lastName: 'Hane', age: 11 },
  { firstName: 'Shyanne', lastName: 'Goyette', age: 27 },
  { firstName: 'Martine', lastName: 'Lueilwitz', age: 1 },
  { firstName: 'Kamille', lastName: 'Hackett', age: 27 },
  { firstName: 'Verlie', lastName: 'Jacobson', age: 14 },
  { firstName: 'Noelia', lastName: 'Kling', age: 31 },
  { firstName: 'Raymond', lastName: 'Rau-Langosh', age: 3 },
  { firstName: 'Athena', lastName: 'Von', age: 14 },
  { firstName: 'Wilhelmine', lastName: 'Champlin', age: 17 },
  { firstName: 'Jo', lastName: 'Pacocha', age: 5 },
  { firstName: 'Jillian', lastName: 'Fahey', age: 22 },
  { firstName: 'Rita', lastName: 'Crona', age: 38 },
  { firstName: 'Victor', lastName: 'Cronin', age: 37 },
  { firstName: 'Christiana', lastName: 'Rodriguez-Bailey', age: 31 },
  { firstName: 'Lazaro', lastName: 'Senger', age: 5 },
  { firstName: 'Amari', lastName: 'Glover', age: 18 },
  { firstName: 'Winona', lastName: 'Wehner', age: 19 },
  { firstName: 'Rachel', lastName: 'Schumm', age: 10 },
  // cspell: enable
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('firstName', { header: 'First Name' }),
  columnHelper.accessor('lastName', { header: 'Last Name' }),
  columnHelper.accessor('age', { header: 'Age' }),
];

export const Default: Story = {
  render: () => {
    const table = useTable({ data: MOCK_DATA.slice(10), columns });

    return <DataTable table={table} withPagination={false} />;
  },
};
