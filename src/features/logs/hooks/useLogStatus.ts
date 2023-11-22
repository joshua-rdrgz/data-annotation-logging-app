import { useEditLog } from './useEditLog';
import { useLog } from './useLog';

type Status = 'PAY_OUT' | 'READY_TO_PAY_OUT';

export const useLogStatus = (logId: string) => {
  const { log } = useLog(logId);
  const { editLog, isEditingLog } = useEditLog(logId);

  const toggleLogStatus = (status: Status) => {
    switch (status) {
      case 'PAY_OUT':
        console.log('LOG: ', log);
        editLog({
          logId,
          values: {
            ...log,
            date: new Date(log.date),
            paidOut: !log.paidOut,
          },
        });
        break;
      case 'READY_TO_PAY_OUT':
        editLog({
          logId,
          values: {
            ...log,
            date: new Date(log.date),
            readyToPayOut: !log.readyToPayOut,
          },
        });
        break;
      default:
        return;
    }
  };

  return {
    toggleLogStatus,
    isToggling: isEditingLog,
  };
};
