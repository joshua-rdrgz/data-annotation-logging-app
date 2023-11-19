import prisma from '@/lib/prisma';
import { Log } from '@prisma/client';

class LogAPIService {
  async createLog(data: Log) {
    return await prisma.log.create({ data });
  }

  async getLogs() {
    return await prisma.log.findMany();
  }
}

const logAPIService = new LogAPIService();

export { logAPIService };
