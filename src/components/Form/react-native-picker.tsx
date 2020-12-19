import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { Picker } from '@react-native-picker/picker';
import {
  PickerItemProps,
  PickerProps,
  ItemValue,
} from '@react-native-picker/picker/typings/Picker';

interface RNPickerProps extends Omit<PickerProps, 'selectedValue'> {
  name: string;
  options: PickerItemProps[];
  placeholderColor?: string;
  placeholder?: string;
}

function RNPicker({
  name,
  options,
  placeholder = 'Select an option',
  placeholderColor = '#c6c6c6',
  onValueChange,
  ...rest
}: RNPickerProps): JSX.Element {
  const inputRef = useRef<Picker>(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  const [selectedValue, setSelectedValue] = useState<ItemValue>(defaultValue);

  const mergeOnValueChange = useCallback(
    (itemValue: ItemValue, itemIndex: number) => {
      setSelectedValue(itemValue);
      onValueChange && onValueChange(itemValue, itemIndex);
    },
    [onValueChange],
  );

  useEffect(() => {
    registerField<ItemValue>({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: Picker) => ref.props.selectedValue || '',
      setValue: (_, value) => setSelectedValue(value),
      clearValue: () => setSelectedValue(''),
    });
  }, [fieldName, registerField]);

  return (
    <Picker
      ref={inputRef}
      selectedValue={selectedValue}
      onValueChange={mergeOnValueChange}
      {...rest}
    >
      <Picker.Item color={placeholderColor} label={placeholder} value="" />
      {options.map(option => (
        <Picker.Item key={option.value} color="#000" {...option} />
      ))}
    </Picker>
  );
}

export default RNPicker;
export type { PickerItemProps };
