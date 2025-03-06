import type { ComponentProps } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { tv } from 'tailwind-variants';

import { Icons } from '@/components/ui/icons';

const dropdownVariants = tv({
  slots: {
    content:
      'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
    item: "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    checkboxItem:
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    radioItem:
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    label: 'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
    separator: 'bg-border -mx-1 my-1 h-px',
    shortcut: 'text-muted-foreground ml-auto text-xs tracking-widest',
    subTrigger:
      'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8',
    subContent:
      'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg',
  },
});

const {
  checkboxItem,
  content,
  item,
  label,
  radioItem,
  separator,
  shortcut,
  subContent,
  subTrigger,
} = dropdownVariants();

const Menu = ({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Root>) => {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
};

const MenuPortal = ({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Portal>) => {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
};

const MenuTrigger = ({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
};

const MenuContent = ({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={content({ className })}
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

const MenuGroup = ({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Group>) => {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
};

const MenuItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) => {
  return (
    <DropdownMenuPrimitive.Item
      className={item({ className })}
      data-inset={inset}
      data-slot="dropdown-menu-item"
      data-variant={variant}
      {...props}
    />
  );
};

const MenuCheckboxItem = ({
  checked,
  children,
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      className={checkboxItem({ className })}
      data-slot="dropdown-menu-checkbox-item"
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Icons.Check />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
};

const MenuRadioGroup = ({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) => {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
};

const MenuRadioItem = ({
  children,
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={radioItem({ className })}
      data-slot="dropdown-menu-radio-item"
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Icons.Circle className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
};

const MenuLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) => {
  return (
    <DropdownMenuPrimitive.Label
      className={label({ className })}
      data-inset={inset}
      data-slot="dropdown-menu-label"
      {...props}
    />
  );
};

const MenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) => {
  return (
    <DropdownMenuPrimitive.Separator
      className={separator({ className })}
      data-slot="dropdown-menu-separator"
      {...props}
    />
  );
};

const MenuShortcut = ({ className, ...props }: ComponentProps<'span'>) => {
  return <span className={shortcut({ className })} data-slot="dropdown-menu-shortcut" {...props} />;
};

const MenuSub = ({ ...props }: ComponentProps<typeof DropdownMenuPrimitive.Sub>) => {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
};

const MenuSubTrigger = ({
  children,
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) => {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={subTrigger({ className })}
      data-inset={inset}
      data-slot="dropdown-menu-sub-trigger"
      {...props}
    >
      {children}

      <Icons.ChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  );
};

const MenuSubContent = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => {
  return (
    <DropdownMenuPrimitive.SubContent
      className={subContent({ className })}
      data-slot="dropdown-menu-sub-content"
      {...props}
    />
  );
};

export const Dropdown = {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
};
