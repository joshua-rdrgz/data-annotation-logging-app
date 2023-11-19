import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { QueryKeys } from '@/lib/queryKeys';
import { useQueryClientInstance } from '@/context/query-provider';
import { logSchema, type LogSchema } from '@/schemas/logSchema';
import { logClientService } from '@/services/client/log';
import { LogItem } from '@/features/logs/LogItem';
import { Form } from '@/ui/form';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

const INPUTS = [
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

export const CreateLog = () => {
  const formMethods = useForm<LogSchema>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      projectName: '',
      tasksCompleted: 0,
      minutesWorked: 0,
      hourlyRate: 0,
    },
  });

  const { queryClient } = useQueryClientInstance();

  const { mutate: createLog, isPending } = useMutation({
    mutationFn: logClientService.createLog,
    onSuccess() {
      toast.success('Log successfully created', {
        icon: '🎉',
      });
      queryClient.refetchQueries({ queryKey: [QueryKeys.LOGS] });
      formMethods.reset();
    },
    onError(error) {
      toast.error('Uh oh, something went wrong....', {
        icon: '💥',
      });
      console.error('🔥 ERROR 🔥: ', error.message);
    },
  });

  const onSubmit = formMethods.handleSubmit((values) => createLog(values));

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} className='space-y-3'>
      {INPUTS.map((input) => (
        <Form.Field
          key={input.name}
          name={input.name}
          disabled={isPending}
          render={({ field: { onChange, value } }) => (
            <LogItem onChange={onChange} value={value} label={input.label} />
          )}
        />
      ))}
      <Button asChild>
        <Input type='submit' disabled={isPending} />
      </Button>
    </Form>
  );
};
