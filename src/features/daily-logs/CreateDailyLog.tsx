import { useState } from 'react';

export const CreateDailyLog = () => {
  const [name, setName] = useState<string | undefined>();
  const [tasksCompleted, setTasksCompleted] = useState<number | undefined>();
  const [minutesWorked, setMinutesWorked] = useState<number | undefined>();
  const [hourlyRate, setHourlyRate] = useState<number | undefined>();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createDailyLog = async () => {
      const data = {
        date: new Date().toISOString(),
        name,
        tasksCompleted,
        minutesWorked,
        hourlyRate,
      };

      const response = await fetch('/api/dailylogs', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return await response.json();
    };

    createDailyLog();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor='name'>Name</label>
      <input
        id='name'
        type='text'
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor='tasksCompleted'>Tasks Completed</label>
      <input
        id='tasksCompleted'
        type='number'
        value={tasksCompleted || ''}
        onChange={(e) => setTasksCompleted(+e.target.value)}
      />
      <label htmlFor='minutesWorked'>Minutes Worked</label>
      <input
        id='minutesWorked'
        type='number'
        value={minutesWorked || ''}
        onChange={(e) => setMinutesWorked(+e.target.value)}
      />
      <label htmlFor='hourlyRate'>Hourly Rate</label>
      <input
        id='hourlyRate'
        type='number'
        value={hourlyRate || ''}
        onChange={(e) => setHourlyRate(+e.target.value)}
      />
      <input type='submit' />
    </form>
  );
};
