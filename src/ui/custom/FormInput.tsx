import { Form } from '@/ui/form';
import { Input } from '@/ui/input';

type ComponentWithProps<TProps> = (props: TProps) => JSX.Element;

interface FormInputProps {
  value: any;
  onChange(...event: any[]): void;
  label: string;
  component?: ComponentWithProps<any>;
  inputProps?: { [key: string]: any };
  disabled?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  value,
  onChange,
  label,
  component: Component,
  inputProps,
  disabled,
}) => {
  const Comp = Component ? Component : Input;

  return (
    <Form.Item>
      <div className='flex justify-between'>
        <Form.Label className='text-[0.75rem]'>{label}</Form.Label>
        <Form.Message className='text-[0.75rem]' />
      </div>
      <Form.Control>
        <Comp
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...inputProps}
        />
      </Form.Control>
    </Form.Item>
  );
};
