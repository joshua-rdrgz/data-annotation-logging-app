import { EditLogSchema, editLogSchema } from '@/schemas/logSchema';
import { DatePicker } from '@/ui/custom/DatePicker';
import { YesOrNoToggle } from '@/ui/custom/YesOrNoToggle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEditLog } from '@/features/logs/hooks/useEditLog';
import { Form } from '@/ui/form';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { LogFormInput } from './LogFormInput';

const INPUTS = [
  {
    name: 'date' as const,
    label: 'Date',
    Component: DatePicker,
  },
  {
    name: 'projectName' as const,
    label: 'Project Name',
  },
  {
    name: 'tasksCompleted' as const,
    label: 'Tasks Completed',
    inputProps: {
      type: 'number',
    },
  },
  {
    name: 'minutesWorked' as const,
    label: 'Minutes Worked',
    inputProps: {
      type: 'number',
    },
  },
  {
    name: 'hourlyRate' as const,
    label: 'Hourly Rate',
    inputProps: {
      type: 'number',
    },
  },
  {
    name: 'readyToPayOut' as const,
    label: 'Ready to Pay Out?',
    Component: YesOrNoToggle,
  },
  {
    name: 'paidOut' as const,
    label: 'Paid Out?',
    Component: YesOrNoToggle,
  },
];

interface EditLogFormProps {
  log: any;
  onSuccess?(): void;
}

export const EditLogForm = ({ log, onSuccess }: EditLogFormProps) => {
  const { editLog, isEditingLog } = useEditLog(log.id, { onSuccess });

  const formMethods = useForm<EditLogSchema>({
    resolver: zodResolver(editLogSchema),
    defaultValues: {
      date: new Date(log?.date || Date.now()),
      projectName: log?.projectName || '',
      tasksCompleted: log?.tasksCompleted || 0,
      minutesWorked: log?.minutesWorked || 0,
      hourlyRate: log?.hourlyRate || 0,
      readyToPayOut: log?.readyToPayOut || false,
      paidOut: log?.paidOut || false,
    },
  });

  const onSubmit = formMethods.handleSubmit((values) =>
    editLog({ logId: log.id, values })
  );

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} className='space-y-3'>
      {INPUTS.map((input) => (
        <Form.Field
          key={input.name}
          name={input.name}
          disabled={isEditingLog}
          render={({ field: { onChange, value } }) => (
            <LogFormInput
              component={input.Component}
              onChange={onChange}
              value={value}
              label={input.label}
            />
          )}
        />
      ))}
      <Button asChild>
        <Input type='submit' disabled={isEditingLog} />
      </Button>
    </Form>
  );
};
