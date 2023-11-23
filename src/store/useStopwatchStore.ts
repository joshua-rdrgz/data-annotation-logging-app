import { create } from 'zustand';

interface StopwatchStoreState {
  values: {
    /**
     * UNIT: **milliseconds**
     */
    time: number;
    timeIsRunning: boolean;
    timeHasStarted: boolean;
  };

  methods: {
    setTime(time: StopwatchStoreState['values']['time']): void;
    setTimeIsRunning(to: boolean): void;
    toggleTimeIsRunning(): void;
    setTimeHasStarted(to: boolean): void;
  };
}

export const useStopwatchStore = create<StopwatchStoreState>()((set) => ({
  values: { time: 0, timeIsRunning: false, timeHasStarted: false },
  methods: {
    setTime: (time) =>
      set((state) => ({ ...state, values: { ...state.values, time } })),

    setTimeIsRunning: (to) =>
      set((state) => ({
        ...state,
        values: { ...state.values, timeIsRunning: to },
      })),

    toggleTimeIsRunning: () =>
      set((state) => ({
        ...state,
        values: {
          ...state.values,
          timeIsRunning: !state.values.timeIsRunning,
        },
      })),

    setTimeHasStarted: (to) =>
      set((state) => ({
        ...state,
        values: {
          ...state.values,
          timeHasStarted: to,
        },
      })),
  },
}));
