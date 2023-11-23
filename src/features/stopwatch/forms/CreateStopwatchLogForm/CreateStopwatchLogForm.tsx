import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStopwatchStore } from '@/store/useStopwatchStore';
import {
  createStopwatchLogSchema,
  type CreateStopwatchLogSchema,
} from '@/schemas/logSchema';
import { CreateSWLogFormStepOne } from './CreateSWLogFormStepOne';
import { CreateSWLogFormStepTwo } from './CreateSWLogFormStepTwo';
import { CreateSWLogFormNav } from './CreateSWLogFormNav';
import { useCreateLog } from '@/features/logs/hooks/useCreateLog';
import { Form } from '@/ui/form';
import { millisecondsToNearestMinute } from '@/utils/calculations';

interface CreateStopwatchLogFormProps {
  onFormSuccess?(): void;
}

export const CreateStopwatchLogForm: React.FC<CreateStopwatchLogFormProps> = ({
  onFormSuccess,
}) => {
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const time = useStopwatchStore((state) => state.values.time);

  const formMethods = useForm<CreateStopwatchLogSchema>({
    resolver: zodResolver(createStopwatchLogSchema),
    defaultValues: {
      projectName: '',
      tasksCompleted: 0,
      minutesWorked: millisecondsToNearestMinute(time),
      hourlyRate: 0,
      confirmMinutes: false,
      confirmEarnings: false,
    },
  });

  const { createLog, isCreatingLog } = useCreateLog({
    onSuccess() {
      onFormSuccess?.();
      formMethods.reset();
    },
  });

  const onNext = async () => {
    if (
      await formMethods.trigger([
        'projectName',
        'tasksCompleted',
        'minutesWorked',
        'hourlyRate',
      ])
    ) {
      setFormStep(2);
    }
  };

  const onBack = () => {
    setFormStep(1);
  };

  const onSubmit = formMethods.handleSubmit((values) => {
    const { confirmMinutes, confirmEarnings, ...vals } = values;
    createLog(vals);
  });

  const { minutesWorked, hourlyRate, confirmMinutes, confirmEarnings } =
    formMethods.getValues();

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} className='space-y-3'>
      {formStep === 1 && <CreateSWLogFormStepOne disabled={isCreatingLog} />}
      {formStep === 2 && (
        <CreateSWLogFormStepTwo
          disabled={isCreatingLog}
          minutesWorked={minutesWorked}
          hourlyRate={hourlyRate}
        />
      )}
      <CreateSWLogFormNav
        formStep={formStep}
        onNext={onNext}
        onBack={onBack}
        submitDisabled={isCreatingLog || !confirmMinutes || !confirmEarnings}
      />
    </Form>
  );
};
