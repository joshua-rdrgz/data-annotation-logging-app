import { useState } from 'react';
import * as ToggleGroup from '@/ui/custom/toggle-group';

type YesOrNo = 'yes' | 'no';

interface YesOrNoToggleProps {
  value: boolean;
  onChange(...event: any[]): void;
}

export const YesOrNoToggle = ({ value, onChange }: YesOrNoToggleProps) => {
  const [yesOrNo, setYesOrNo] = useState<YesOrNo>(value ? 'yes' : 'no');

  return (
    <ToggleGroup.Root
      type='single'
      value={yesOrNo}
      onValueChange={(newVal: YesOrNo) => {
        onChange(newVal === 'yes' ? true : false);
        setYesOrNo(newVal);
      }}
    >
      <ToggleGroup.Item value='yes' disabled={yesOrNo === 'yes'}>
        Yes
      </ToggleGroup.Item>
      <ToggleGroup.Item value='no' disabled={yesOrNo === 'no'}>
        No
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};
