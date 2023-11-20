import prisma from '@/lib/prisma';
import { Log } from '@prisma/client';

class LogAPIService {
  async createLog(data: Log) {
    return await prisma.log.create({ data });
  }

  async getLogs() {
    return await prisma.log.findMany();
  }

  async getLog(logId: string) {
    return await prisma.log.findUnique({
      where: {
        id: logId,
      },
    });
  }

  async editLog(logId: string, data: Log) {
    return await prisma.log.update({
      where: { id: logId },
      data,
    });
  }

  async deleteLog(logId: string) {
    return await prisma.log.delete({
      where: {
        id: logId,
      },
    });
  }
}

const logAPIService = new LogAPIService();

export { logAPIService };
