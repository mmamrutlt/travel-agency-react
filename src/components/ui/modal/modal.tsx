import React, { type ComponentProps, useState } from 'react';

import { Button } from '@/components/ui/button';

export interface ModalProps extends Omit<ComponentProps<'div'>, 'title'> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  saveText?: string;
  cancelText?: string;
}

const Modal = ({
  cancelText = 'Cancel',
  children,
  description,
  footer,
  onCancel,
  onOpenChange,
  onSave,
  open: controlledOpen,
  saveText = 'Save',
  title,
  ...props
}: ModalProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  if (!open) {
    return null;
  }

  const defaultFooter = (
    <>
      <Button
        onClick={
          onCancel ??
          (() => {
            return setOpen(false);
          })
        }
      >
        {cancelText}
      </Button>
      <Button onClick={onSave}>{saveText}</Button>
    </>
  );

  return (
    <div
      className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      data-state={open ? 'open' : 'closed'}
      {...props}
    >
      <div
        className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] relative z-50 grid w-full gap-4 border p-6 shadow-lg duration-200 sm:max-w-lg sm:rounded-lg"
        data-state={open ? 'open' : 'closed'}
      >
        {title || description ? (
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            {title ? (
              <h2 className="text-lg leading-none font-semibold tracking-tight">{title}</h2>
            ) : null}
            {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
          </div>
        ) : null}
        {children}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          {footer ?? defaultFooter}
        </div>
      </div>
    </div>
  );
};

export { Modal };
