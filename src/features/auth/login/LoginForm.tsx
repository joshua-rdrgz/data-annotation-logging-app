import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginSchema, loginSchema } from '@/schemas/authSchema';
import { useLogin } from '@/features/auth/login/useLogin';
import { Form } from '@/ui/form';
import { FormInput } from '@/ui/custom/FormInput';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';

const LOGIN_INPUTS = [
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
];

export const LoginForm = () => {
  const { login, isLoggingIn } = useLogin();

  const formMethods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = formMethods.handleSubmit((values) => login(values));

  return (
    <Form
      formMethods={formMethods}
      onSubmit={onSubmit}
      className='space-y-3 w-full'
    >
      {LOGIN_INPUTS.map((input) => (
        <Form.Field
          key={input.name}
          name={input.name}
          disabled={isLoggingIn}
          render={({ field: { onChange, value } }) => (
            <FormInput
              value={value}
              onChange={onChange}
              label={input.label}
              disabled={isLoggingIn}
              inputProps={input.props}
            />
          )}
        />
      ))}

      <Button asChild disabled={isLoggingIn}>
        <Input type='submit' value='Log In' />
      </Button>
    </Form>
  );
};
