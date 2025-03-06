import { type ComponentProps } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { tv } from 'tailwind-variants';

import type { Styled } from '@/types/styles';

const labelVariants = tv({
  base: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
});

type LabelProps = ComponentProps<typeof LabelPrimitive.Root> & Styled;

const Label = ({ className, ...props }: LabelProps) => {
  return <LabelPrimitive.Root className={labelVariants({ className })} {...props} />;
};

export { Label };
