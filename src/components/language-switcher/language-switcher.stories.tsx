import type { Meta, StoryObj } from '@storybook/react';

import { LanguageSwitcher } from './language-switcher';

const meta: Meta<typeof LanguageSwitcher> = {
  component: LanguageSwitcher,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/LanguageSwitcher',
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <LanguageSwitcher {...props} />;
  },
};
