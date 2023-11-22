import { createStore } from 'zustand';
import { Log } from '@prisma/client';
import { injectEarnings } from '@/utils/calculations';

export interface LogWithEarnings extends Log {
  earnings: number;
}

export interface LogStoreProps {
  logs: LogWithEarnings[];
}

export interface LogStoreState extends LogStoreProps {
  updateLogs(newLogs: Log[]): void;
}

export const createLogStore = (initProps?: Partial<LogStoreProps>) => {
  const DEFAULT_PROPS: LogStoreProps = {
    logs: [],
  };
  return createStore<LogStoreState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    updateLogs: (newLogs: Log[]): void => {
      set(() => ({
        logs: injectEarnings(newLogs),
      }));
    },
  }));
};

export type LogStore = ReturnType<typeof createLogStore>;
