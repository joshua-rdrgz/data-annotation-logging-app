import * as D from '@/ui/dialog';

type BaseProps<TIsControlled extends boolean> = {
  controlled?: TIsControlled;
  children: React.ReactNode;
  triggerContent: React.ReactNode;
};

type ControlledProps<TIsControlled extends boolean> =
  BaseProps<TIsControlled> & {
    open: boolean;
    onOpenChange(open: boolean): void;
  };

type DialogProps<TIsControlled extends boolean> = TIsControlled extends true
  ? ControlledProps<TIsControlled>
  : BaseProps<TIsControlled>;

export function Dialog<TIsControlled extends boolean = false>(
  props: DialogProps<TIsControlled>
) {
  const dialogContent = (
    <>
      <D.Trigger asChild>{props.triggerContent}</D.Trigger>
      <D.Content>{props.children}</D.Content>
    </>
  );

  return (
    <>
      {props.controlled && (
        <D.Root open={props.open} onOpenChange={props.onOpenChange}>
          {dialogContent}
        </D.Root>
      )}
      {!props.controlled && <D.Root>{dialogContent}</D.Root>}
    </>
  );
}
