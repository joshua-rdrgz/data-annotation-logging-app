import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { DailyLog } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const dailyLog = await createDailyLog(JSON.parse(req.body));
      res.status(200).json({
        status: 'success',
        data: dailyLog,
      });
    } catch (error: any) {
      console.log('error: ', error);
      res.status(500).json({
        status: 'error',
        message: `Something went wrong: ${error.message}`,
      });
    }
  }
}

async function createDailyLog(data: DailyLog) {
  return await prisma.dailyLog.create({ data });
}
