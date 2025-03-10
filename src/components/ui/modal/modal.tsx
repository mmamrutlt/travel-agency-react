import React, { type ComponentProps, createContext, useContext, useState } from 'react';
import { tv } from 'tailwind-variants';

import { Button } from '@/components/ui/button';

const modalVariants = tv({
  base: 'absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
});

const modalContentVariants = tv({
  base: 'relative z-50 grid w-full gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
  variants: {
    size: {
      default: 'sm:max-w-lg',
      sm: 'sm:max-w-sm',
      lg: 'sm:max-w-2xl',
      xl: 'sm:max-w-4xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

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
  size?: 'default' | 'sm' | 'lg' | 'xl';
}

interface ModalTriggerProps extends ComponentProps<'button'> {
  asChild?: boolean;
}

const Modal = ({
  cancelText = 'Cancel',
  children,
  className,
  description,
  footer,
  onCancel,
  onOpenChange,
  onSave,
  open: controlledOpen,
  saveText = 'Save',
  size = 'default',
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
        variant="outline"
      >
        {cancelText}
      </Button>
      <Button onClick={onSave}>{saveText}</Button>
    </>
  );

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      <div
        className={modalVariants({ className })}
        data-state={open ? 'open' : 'closed'}
        {...props}
      >
        <div className={modalContentVariants({ size })} data-state={open ? 'open' : 'closed'}>
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
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a Modal');
  }
  return context;
};

const ModalTrigger = ({ asChild, children, ...props }: ModalTriggerProps) => {
  const { setOpen } = useModal();

  const handleClick = () => {
    return setOpen(true);
  };

  if (asChild) {
    const child = children as React.ReactElement;
    return React.cloneElement(child, { onClick: handleClick, ...props });
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export { Modal, ModalTrigger };
