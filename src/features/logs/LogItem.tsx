import { Form } from '@/ui/form';
import { Input } from '@/ui/input';

interface LogItemProps {
  value: any;
  onChange(...event: any[]): void;
  label: string;
}
export const LogItem: React.FC<LogItemProps> = ({ value, onChange, label }) => (
  <Form.Item>
    <div className='flex justify-between'>
      <Form.Label className='text-[0.75rem]'>{label}</Form.Label>
      <Form.Message className='text-[0.75rem]' />
    </div>
    <Form.Control>
      <Input value={value} onChange={onChange} />
    </Form.Control>
  </Form.Item>
);
