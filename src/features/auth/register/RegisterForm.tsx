import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type RegisterSchema, registerSchema } from '@/schemas/authSchema';
import { useRegister } from '@/features/auth/register/useRegister';
import { Form } from '@/ui/form';
import { FormInput } from '@/ui/custom/FormInput';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';

const REGISTER_INPUTS = [
  {
    name: 'name' as const,
    label: 'Name',
  },
  {
    name: 'email' as const,
    label: 'Email',
  },
  {
    name: 'password' as const,
    label: 'Password',
    props: {
      type: 'password',
    },
  },
  {
    name: 'passwordConfirm' as const,
    label: 'Confirm Password',
    props: {
      type: 'password',
    },
  },
];

export const RegisterForm = () => {
  const { register, isRegistering } = useRegister();

  const formMethods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  const onSubmit = formMethods.handleSubmit((values) => register(values));

  return (
    <Form
      formMethods={formMethods}
      onSubmit={onSubmit}
      className='space-y-3 w-full'
    >
      {REGISTER_INPUTS.map((input) => (
        <Form.Field
          key={input.name}
          name={input.name}
          disabled={isRegistering}
          render={({ field: { onChange, value } }) => (
            <FormInput
              value={value}
              onChange={onChange}
              label={input.label}
              inputProps={input.props}
              disabled={isRegistering}
            />
          )}
        />
      ))}

      <Button asChild>
        <Input type='submit' value='Register' />
      </Button>
    </Form>
  );
};
