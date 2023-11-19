import { NextApiRequest, NextApiResponse } from 'next';
import { DailyLog } from '@prisma/client';
import { dailyLogAPIService } from '@/services/server/dailyLog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data: DailyLog | DailyLog[];

  try {
    switch (req.method) {
      case 'GET':
        data = await dailyLogAPIService.getDailyLogs();
        break;
      case 'POST':
        data = await dailyLogAPIService.createDailyLog(req.body);
        break;
      default:
        throw new Error('This route only supports GET and POST requests.');
    }

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Something went wrong on server: ${error.message}`,
    });
  }
}
