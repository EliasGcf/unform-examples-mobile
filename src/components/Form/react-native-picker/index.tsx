import React, { useEffect, useRef, useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { useField } from '@unform/core';

interface Props {
  name: string;
  options: {
    label: string;
    value: string;
  }[];
}

const RNPicker: React.FC<Props> = ({ name, options }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: ref => ref.props.selectedValue,
      setValue: (_, value: string) => {
        setSelectedValue(value);
      },
      clearValue: () => {
        setSelectedValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Picker
      ref={inputRef}
      selectedValue={selectedValue}
      onValueChange={itemValue => setSelectedValue(itemValue)}
    >
      <Picker.Item color="#c6c6c6" label="Select an item" value="" />
      {options.map(option => (
        <Picker.Item
          color="#000"
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </Picker>
  );
};

export default RNPicker;
