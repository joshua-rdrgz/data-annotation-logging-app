import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import * as Popover from '@/ui/popover';
import { SelectSingleEventHandler } from 'react-day-picker';

interface DatePickerProps {
  value: Date;
  onChange(...event: any[]): void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [open, setOpen] = React.useState(false);

  const onDateChange: SelectSingleEventHandler = (date) => {
    onChange(date);
    setDate(date);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </Popover.Trigger>
      <Popover.Content className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
      </Popover.Content>
    </Popover.Root>
  );
}
