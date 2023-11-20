import { NextApiRequest, NextApiResponse } from 'next';
import { Log } from '@prisma/client';
import { logAPIService } from '@/services/server/log';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data: Log | Log[];
  let resWithStatus: NextApiResponse<any>;

  try {
    switch (req.method) {
      case 'GET':
        data = await logAPIService.getLogs();
        resWithStatus = res.status(200);
        break;
      case 'POST':
        data = await logAPIService.createLog(req.body);
        resWithStatus = res.status(201);
        break;
      default:
        throw new Error('This route only supports GET and POST requests.');
    }

    resWithStatus.json({
      status: 'success',
      data,
    });
  } catch (error: any) {
    console.error('💥 SERVER ERROR 💥: ', error.message);
    res.status(500).json({
      status: 'error',
      message: `Something went wrong on server: ${error.message}`,
    });
  }
}
