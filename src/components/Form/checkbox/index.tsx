/* eslint-disable no-use-before-define */
import React, { useRef, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useField } from '@unform/core';
import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox';

interface Props extends CheckBoxProps {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
}

interface InputRefProps {
  value: string;
  checked: boolean;
}

const Checkbox: React.FC<Props> = ({ name, options }) => {
  const inputRefs = useRef<InputRefProps[]>([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  const [checkboxValues, setCheckboxValues] = useState<string[]>(defaultValue);

  useEffect(() => {
    inputRefs.current.forEach((ref, index) => {
      ref.value = options[index].value;

      ref.checked = checkboxValues.includes(options[index].value);
    });
  }, [checkboxValues, options]);

  useEffect(() => {
    registerField<string[]>({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: InputRefProps[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: () => {
        setCheckboxValues([]);
      },
      setValue: (_, values) => {
        setCheckboxValues(values);
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {options.map(option => (
        <View key={option.value} style={styles.checkboxContainer}>
          <CheckBox
            value={checkboxValues.includes(option.value)}
            onValueChange={() => {
              setCheckboxValues(state => [
                ...new Set([...state, option.value]),
              ]);
            }}
            ref={ref => inputRefs.current.push(ref as any)}
          />
          <Text style={styles.checkboxLabel}>{option.label}</Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default Checkbox;
