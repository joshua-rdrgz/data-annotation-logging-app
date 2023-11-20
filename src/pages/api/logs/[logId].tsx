import { NextApiRequest, NextApiResponse } from 'next';
import { logAPIService } from '@/services/server/log';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { logId } = req.query;

  if (typeof logId !== 'string')
    throw new Error('"logId" query parameter must be a string.');

  try {
    switch (req.method) {
      case 'DELETE':
        await logAPIService.deleteLog(logId);
        res.status(204).end();
        break;
      default:
        throw new Error('This route only supports DELETE requests.');
    }
  } catch (error: any) {
    console.error('💥 SERVER ERROR 💥: ', error.message);
    res.status(500).json({
      status: 'error',
      message: `Something went wrong on server: ${error.message}`,
    });
  }
}
