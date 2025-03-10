import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button';
import { Modal } from './modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/UI/Modal',
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Modal onOpenChange={setOpen} open={open}>
        <Button>Open Modal</Button>
      </Modal>
    );
  },
};
