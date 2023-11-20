import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/utils';

const Root = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        'flex justify-between rounded mr-auto w-max px-1.5 py-1 bg-muted gap-1',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Root.displayName = ToggleGroupPrimitive.Root.displayName;

const Item = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        'text-sm px-1.5 py-1 rounded bg-accent hover:bg-primary-foreground hover:text-primary data-[state=on]:bg-accent-foreground data-[state=on]:text-accent disabled:cursor-not-allowed',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Item.displayName = ToggleGroupPrimitive.Item.displayName;

export { Root, Item };
