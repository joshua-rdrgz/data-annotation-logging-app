import axios from 'axios';
import { APIRoutes } from '@/lib/apiRoutes';
import { LogSchema } from '@/schemas/logSchema';

class LogClientService {
  async createLog(values: LogSchema) {
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
}

const logClientService = new LogClientService();
export { logClientService };
