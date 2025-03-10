import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button';
import { Modal, ModalTrigger } from './modal';

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
        <ModalTrigger asChild>
          <Button>Open Modal</Button>
        </ModalTrigger>
      </Modal>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [openSmall, setOpenSmall] = useState(false);
    const [openLarge, setOpenLarge] = useState(false);

    return (
      <div className="flex gap-4">
        <Modal onOpenChange={setOpenSmall} open={openSmall}>
          <ModalTrigger asChild>
            <Button>Small Modal</Button>
          </ModalTrigger>
        </Modal>

        <Modal onOpenChange={setOpenLarge} open={openLarge}>
          <ModalTrigger asChild>
            <Button>Large Modal</Button>
          </ModalTrigger>
        </Modal>
      </div>
    );
  },
};
