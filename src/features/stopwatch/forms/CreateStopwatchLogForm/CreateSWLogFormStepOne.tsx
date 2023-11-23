import { LogFormInput } from '@/features/logs/forms/LogFormInput';
import { Form } from '@/ui/form';

export const STEP_ONE_INPUTS = [
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

export const CreateSWLogFormStepOne = ({ disabled }: { disabled: boolean }) => {
  return STEP_ONE_INPUTS.map((input) => (
    <Form.Field
      key={input.name}
      name={input.name}
      disabled={disabled}
      render={({ field: { onChange, value } }) => (
        <LogFormInput
          onChange={onChange}
          value={value}
          label={input.label}
          disabled={input.name === 'minutesWorked'}
        />
      )}
    />
  ));
};
