import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dailyLogSchema, type DailyLogSchema } from '@/schemas/dailyLogSchema';
import { dailyLogService } from '@/services/dailyLogService';
import { DailyLogItem } from '@/features/daily-logs/DailyLogItem';
import { Form } from '@/ui/form';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

const INPUTS = [
  {
    name: 'name' as const,
    label: 'Task Name',
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

export const CreateDailyLog = () => {
  const formMethods = useForm<DailyLogSchema>({
    resolver: zodResolver(dailyLogSchema),
    defaultValues: {
      name: '',
      tasksCompleted: 0,
      minutesWorked: 0,
      hourlyRate: 0,
    },
  });

  const onSubmit = formMethods.handleSubmit((values) =>
    dailyLogService(values)
  );

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} className='space-y-3'>
      {INPUTS.map((input) => (
        <Form.Field
          key={input.name}
          name={input.name}
          render={({ field: { onChange, value } }) => (
            <DailyLogItem
              onChange={onChange}
              value={value}
              label={input.label}
            />
          )}
        />
      ))}
      <Button asChild>
        <Input type='submit' />
      </Button>
    </Form>
  );
};
