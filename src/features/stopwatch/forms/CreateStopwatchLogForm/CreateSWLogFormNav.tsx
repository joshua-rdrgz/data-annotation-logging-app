import { Button } from '@/ui/button';
import { Input } from '@/ui/input';

interface CreateSWLogFormNavProps {
  formStep: 1 | 2;
  onNext(): void;
  onBack(): void;
  submitDisabled: boolean;
}

export const CreateSWLogFormNav: React.FC<CreateSWLogFormNavProps> = ({
  formStep,
  onNext,
  onBack,
  submitDisabled,
}) => {
  return (
    <div className='flex justify-between'>
      {formStep === 1 ? (
        <Button type='button' className='ml-auto' onClick={onNext}>
          Next
        </Button>
      ) : (
        <>
          <Button type='button' variant='secondary' onClick={onBack}>
            Go Back
          </Button>
          <Button asChild className='max-w-min'>
            <Input type='submit' disabled={submitDisabled} value='🥳 Add Log' />
          </Button>
        </>
      )}
    </div>
  );
};
