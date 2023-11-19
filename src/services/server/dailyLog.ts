import prisma from '@/lib/prisma';
import { DailyLog } from '@prisma/client';

class DailyLogAPIService {
  async createDailyLog(data: DailyLog) {
    return await prisma.dailyLog.create({ data });
  }

  async getDailyLogs() {
    return await prisma.dailyLog.findMany();
  }
}

const dailyLogAPIService = new DailyLogAPIService();

export { dailyLogAPIService };
