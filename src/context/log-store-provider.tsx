import { createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';
import {
  createLogStore,
  type LogStoreProps,
  type LogStoreState,
  type LogStore,
} from '@/store/createLogStore';

export const LogContext = createContext<LogStore | null>(null);

type LogProviderProps = React.PropsWithChildren<LogStoreProps>;

export function LogStoreProvider({ children, ...props }: LogProviderProps) {
  const storeRef = useRef<LogStore>();
  if (!storeRef.current) {
    storeRef.current = createLogStore(props);
  }
  return (
    <LogContext.Provider value={storeRef.current}>
      {children}
    </LogContext.Provider>
  );
}

export function useLogStore<T>(selector: (state: LogStoreState) => T): T {
  const store = useContext(LogContext);
  if (!store) throw new Error('Missing LogStoreProvider in the tree');
  return useStore(store, selector);
}
