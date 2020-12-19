import { useField } from '@unform/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Picker, {
  Item,
  PickerSelectProps as RNPickerSelectProps,
} from 'react-native-picker-select';

interface PickerSelectProps extends Omit<RNPickerSelectProps, 'onValueChange'> {
  name: string;
  onValueChange?: (value: any, index: number) => void;
}

export type PickerSelectItem = Item;

function PickerSelect({
  name,
  items,
  onValueChange,
  ...rest
}: PickerSelectProps): JSX.Element {
  const pickerRef = useRef<Picker>(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  const [selectedValue, setSelectedValue] = useState<any>(defaultValue);

  const mergeOnValueChange = useCallback(
    (value: any, index: number) => {
      setSelectedValue(value);
      onValueChange && onValueChange(value, index);
    },
    [onValueChange],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      getValue: (ref: Picker) => ref.props.value || '',
      setValue: (_, value: string) => setSelectedValue(value),
      clearValue: () => setSelectedValue(''),
    });
  }, [fieldName, registerField]);

  return (
    <Picker
      ref={pickerRef}
      value={selectedValue}
      onValueChange={mergeOnValueChange}
      items={items}
      style={{ inputAndroid: { color: '#000' } }}
      {...rest}
    />
  );
}

export default PickerSelect;
