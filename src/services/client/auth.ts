import axios from 'axios';
import { signIn } from 'next-auth/react';
import { APIRoutes } from '@/lib/apiRoutes';
import type { LoginSchema, RegisterSchema } from '@/schemas/authSchema';

class AuthClientService {
  async register(values: RegisterSchema) {
    const { data } = await axios.post(APIRoutes.REGISTER, values);
    return data.data;
  }

  async login(values: LoginSchema) {
    const response = await signIn('credentials', {
      redirect: false,
      callbackUrl: '/dashboard',
      ...values,
    });

    if (response?.error) {
      throw new Error(response.error);
    }
  }
}

const authClientService = new AuthClientService();
export { authClientService };
