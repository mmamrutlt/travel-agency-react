import { type ComponentProps, type ReactNode } from 'react';
import { tv } from 'tailwind-variants';

import { IconWrapper } from '@/components/ui/icons';
import { SIZE, type Size, type Styled } from '@/types/styles';

const inputVariants = tv({
  slots: {
    container: 'relative flex flex-col gap-1.5 w-full',
    input:
      'flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    wrapper: 'relative flex flex-row items-center rounded-md',
    icon: 'pointer-events-none absolute top-1/2 left-2 flex -translate-y-1/2 items-center',
  },
  variants: {
    size: {
      [SIZE.X_SMALL]: { input: 'py-1.5' },
      [SIZE.SMALL]: { input: 'py-2' },
      [SIZE.MEDIUM]: { input: 'py-3' },
      [SIZE.LARGE]: { input: 'py-4' },
      [SIZE.X_LARGE]: { input: 'py-5' },
    },
    left: {
      [SIZE.X_SMALL]: { input: 'pl-8' },
      [SIZE.SMALL]: { input: 'pl-9' },
      [SIZE.MEDIUM]: { input: 'pl-10' },
      [SIZE.LARGE]: { input: 'pl-10' },
      [SIZE.X_LARGE]: { input: 'pl-11' },
    },
  },
});

const { container, icon, input, wrapper } = inputVariants();

interface InputProps extends Omit<ComponentProps<'input'>, 'size'>, Styled {
  containerClassName?: string;
  left?: ReactNode;
  size?: Size;
}

const Input = ({
  className,
  containerClassName,
  left,
  size = SIZE.MEDIUM,
  ...props
}: InputProps) => {
  return (
    <div className={container({ className: containerClassName })}>
      <div className={wrapper()}>
        {left ? (
          <IconWrapper className={icon()} size={size}>
            {left}
          </IconWrapper>
        ) : null}

        <input
          className={input({ className, size, left: left ? size : undefined })}
          type="text"
          {...props}
        />
      </div>
    </div>
  );
};

export { Input };
