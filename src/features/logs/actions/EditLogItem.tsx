import { useState } from 'react';
import { EditLogForm } from '@/features/logs/form/EditLogForm';
import { useLog } from '@/features/logs/hooks/useLog';
import * as D from '@/ui/dialog';
import { DialogItem } from '@/ui/dropdown-menu';

interface EditLogItemProps {
  logId: string;
  onDialogClose?(): void;
}

export const EditLogItem: React.FC<EditLogItemProps> = ({
  logId,
  onDialogClose,
}) => {
  const [open, setOpen] = useState(false);

  const { log } = useLog(logId);

  return (
    <DialogItem open={open} onOpenChange={setOpen} triggerContent='✏️ Edit'>
      <D.Header>
        <D.Title>Edit Log</D.Title>
        <D.Description>Edit the log to reflect its new values.</D.Description>
      </D.Header>
      <EditLogForm
        log={log}
        onSuccess={() => {
          setOpen(false);
          onDialogClose?.();
        }}
      />
    </DialogItem>
  );
};
