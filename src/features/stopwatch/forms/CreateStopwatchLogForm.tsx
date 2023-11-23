import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLogSchema, type CreateLogSchema } from '@/schemas/logSchema';
import { useCreateLog } from '@/features/logs/hooks/useCreateLog';
import { LogFormInput } from '@/features/logs/forms/LogFormInput';
import { Form } from '@/ui/form';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

const STEP_ONE_INPUTS = [
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
];

interface CreateStopwatchLogFormProps {
  onFormSuccess?(): void;
}

export const CreateStopwatchLogForm: React.FC<CreateStopwatchLogFormProps> = ({
  onFormSuccess,
}) => {
  const formMethods = useForm<CreateLogSchema>({
    resolver: zodResolver(createLogSchema),
    defaultValues: {
      projectName: '',
      tasksCompleted: 0,
      minutesWorked: 0,
      hourlyRate: 0,
    },
  });

  const { createLog, isCreatingLog } = useCreateLog({
    onSuccess() {
      onFormSuccess?.();
      formMethods.reset();
    },
  });

  const onSubmit = formMethods.handleSubmit((values) => createLog(values));

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} className='space-y-3'>
      {STEP_ONE_INPUTS.map((input) => (
        <Form.Field
          key={input.name}
          name={input.name}
          disabled={isCreatingLog}
          render={({ field: { onChange, value } }) => (
            <LogFormInput
              onChange={onChange}
              value={value}
              label={input.label}
            />
          )}
        />
      ))}
      <Button asChild>
        <Input type='submit' disabled={isCreatingLog} />
      </Button>
    </Form>
  );
};
