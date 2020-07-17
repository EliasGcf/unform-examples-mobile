/* eslint-disable no-use-before-define */
import React, { useRef, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useField } from '@unform/core';
import CheckBox from '@react-native-community/checkbox';

interface Props {
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

      if (checkboxValues.includes(options[index].value)) {
        ref.checked = true;
      }
    });
  }, [checkboxValues, options]);

  useEffect(() => {
    registerField<string[]>({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: InputRefProps[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs: InputRefProps[]) => {
        refs.forEach(ref => {
          ref.checked = false;
        });
        setCheckboxValues([]);
      },
      setValue: (refs: InputRefProps[], values) => {
        refs.forEach(ref => {
          ref.checked = values.includes(ref.value);
        });
        setCheckboxValues(values);
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {options.map((option, index) => (
        <View key={option.value} style={styles.checkboxContainer}>
          <CheckBox
            value={checkboxValues.includes(option.value)}
            onValueChange={(value: boolean) => {
              if (inputRefs.current) {
                inputRefs.current[index].checked = value;
                setCheckboxValues(state => [
                  ...new Set([...state, option.value]),
                ]);
              }
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
