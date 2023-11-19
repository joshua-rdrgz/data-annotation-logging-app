import axios from 'axios';
import { DailyLogSchema } from '@/schemas/dailyLogSchema';

class DailyLogClientService {
  async createDailyLog(values: DailyLogSchema) {
    try {
      const { data } = await axios.post('/api/daily-logs', {
        ...values,
        date: new Date().toLocaleDateString(),
      });
      return data.data;
    } catch (error: any) {
      console.error('🔥🔥🔥 ERROR 🔥🔥🔥: ', error.message);
      alert(`🔥🔥🔥 ERROR 🔥🔥🔥: ${error.message}`);
    }
  }

  async getDailyLogs() {
    try {
      const { data } = await axios.get('/api/daily-logs');
      return data.data;
    } catch (error: any) {
      console.error('🔥🔥🔥 ERROR 🔥🔥🔥: ', error.message);
      alert(`🔥🔥🔥 ERROR 🔥🔥🔥: ${error.message}`);
    }
  }
}

const dailyLogClientService = new DailyLogClientService();
export { dailyLogClientService };
