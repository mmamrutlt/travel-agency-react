import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { Dropdown } from './dropdown';

const meta: Meta<typeof Dropdown.Menu> = {
  args: { children: 'Dropdown' },
  component: Dropdown.Menu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/UI/Dropdown',
} satisfies Meta<typeof Dropdown.Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Dropdown.Menu>
        <Dropdown.MenuTrigger asChild>
          <Button className="ml-auto" variant="outline">
            Open dropdown
          </Button>
        </Dropdown.MenuTrigger>

        <Dropdown.MenuContent align="end">
          {[
            { label: 'option 1', checked: false },
            { label: 'option 2', checked: true },
            { label: 'option 3', checked: false },
          ].map((option) => {
            return (
              <Dropdown.MenuCheckboxItem
                checked={option.checked}
                className="capitalize"
                key={option.label}
              >
                {option.label}
              </Dropdown.MenuCheckboxItem>
            );
          })}
        </Dropdown.MenuContent>
      </Dropdown.Menu>
    );
  },
};
