import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { RegisterSchema } from '@/schemas/authSchema';

class AuthAPIService {
  async register(values: RegisterSchema) {
    if (values.password !== values.passwordConfirm) {
      throw new Error('Password and Password Confirm must match.');
    }

    return await prisma.user.create({
      data: {
        name: values.name,
        email: values.email,
        passwordHash: await bcrypt.hash(
          values.password,
          Number(process.env.BCRYPT_SALT || 12)
        ),
      },
    });
  }

  async authorize(
    credentials: Record<'email' | 'password', string> | undefined
  ) {
    if (!credentials?.email || !credentials.password)
      throw new Error('Invalid credentials.');

    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new Error('Invalid credentials.');
    }

    return user;
  }
}

const authAPIService = new AuthAPIService();

export { authAPIService };
