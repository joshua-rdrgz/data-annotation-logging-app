import axios from 'axios';
import { APIRoutes } from '@/lib/apiRoutes';
import { CreateLogSchema, EditLogSchema } from '@/schemas/logSchema';

class LogClientService {
  async createLog(values: CreateLogSchema) {
    const { data } = await axios.post(APIRoutes.LOGS, {
      ...values,
      date: new Date().toLocaleDateString(),
    });
    return data.data;
  }

  async getLogs() {
    const { data } = await axios.get(APIRoutes.LOGS);
    return data.data;
  }

  async getLog(logId: string) {
    const { data } = await axios.get(APIRoutes.BASE_LOG + logId);
    return data.data;
  }

  async editLog({ logId, values }: { logId: string; values: EditLogSchema }) {
    const { data } = await axios.patch(APIRoutes.BASE_LOG + logId, {
      ...values,
      date: values.date.toLocaleDateString(),
    });
    return data.data;
  }

  async deleteLog(logId: string) {
    const { data } = await axios.delete(APIRoutes.BASE_LOG + logId);
    return data.data;
  }
}

const logClientService = new LogClientService();
export { logClientService };
