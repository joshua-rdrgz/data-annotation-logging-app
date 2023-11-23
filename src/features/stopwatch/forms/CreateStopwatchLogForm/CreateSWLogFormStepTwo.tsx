import { Form } from '@/ui/form';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import {
  calculateBareEarnings,
  computeTimeStringFromMinutes,
} from '@/utils/calculations';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';

export const STEP_TWO_INPUTS = [
  {
    name: 'confirmMinutes' as const,
    render: function (minutesWorked: any) {
      return function ({
        field: { value, onChange },
      }: {
        field: ControllerRenderProps<
          FieldValues,
          'confirmMinutes' | 'confirmEarnings'
        >;
      }) {
        return (
          <div className='flex gap-5 items-center p-5'>
            <Input
              id='confirmMinutes'
              type='checkbox'
              value={value}
              onChange={onChange}
              className='h-6 w-10'
            />
            <Label
              htmlFor='confirmMinutes'
              className='text-left text-xl font-light'
            >
              I confirm that I&apos;ve logged:{' '}
              <span className='font-bold'>
                {computeTimeStringFromMinutes(minutesWorked)}
              </span>{' '}
              in the DataAnnotation app.
            </Label>
          </div>
        );
      };
    },
  },
  {
    name: 'confirmEarnings' as const,
    render: function (earnings: any) {
      return function ({
        field: { value, onChange },
      }: {
        field: ControllerRenderProps<
          FieldValues,
          'confirmMinutes' | 'confirmEarnings'
        >;
      }) {
        return (
          <div className='flex gap-5 items-center p-5 pb-0'>
            <Input
              id='confirmEarnings'
              type='checkbox'
              value={value}
              onChange={onChange}
              className='h-6 w-10'
            />
            <Label
              htmlFor='confirmEarnings'
              className='text-left text-xl font-light'
            >
              I confirm that DataAnnotation says I&apos;ve earned:{' '}
              <span className='font-bold'>{earnings}</span>
            </Label>
          </div>
        );
      };
    },
  },
];
interface CreateSWLogFormStepTwoProps {
  disabled: boolean;
  minutesWorked: number;
  hourlyRate: number;
}

export const CreateSWLogFormStepTwo: React.FC<CreateSWLogFormStepTwoProps> = ({
  disabled,
  minutesWorked,
  hourlyRate,
}) => {
  const earnings = calculateBareEarnings(minutesWorked, hourlyRate);

  return (
    <>
      <section className='text-center p-7 pb-0'>
        <div className='text-xl'>Congratulations! 🎊 You&apos;ve earned:</div>
        <div className='text-3xl'>
          <span className='font-bold'>{earnings}</span>
        </div>
      </section>
      <section className='text-center p-7 pt-0'>
        {STEP_TWO_INPUTS.map((input) => (
          <Form.Field
            key={input.name}
            name={input.name}
            disabled={disabled}
            render={input.render(
              input.name === 'confirmMinutes' ? minutesWorked : earnings
            )}
          />
        ))}
      </section>
    </>
  );
};
