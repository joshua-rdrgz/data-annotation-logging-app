import type { NextApiRequest, NextApiResponse } from 'next';
import { authAPIService } from '@/services/server/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await authAPIService.register(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      ...user,
      passwordHash: undefined,
    },
  });
}
