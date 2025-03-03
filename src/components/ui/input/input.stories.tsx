import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  args: { placeholder: 'Type your text here...' },
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/UI/Input',
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    const [{ value }, updateArgs] = useArgs();

    return (
      <Input
        {...props}
        onChange={(e) => {
          updateArgs({ value: e.target.value });
        }}
        value={value}
      />
    );
  },
};
