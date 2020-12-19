import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNCheckbox, {
  CheckBoxProps as RNCheckboxProps,
} from '@react-native-community/checkbox';
import { useField } from '@unform/core';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxProps extends RNCheckboxProps {
  name: string;
  options: CheckboxOption[];
}

interface InputRefProps extends RNCheckbox {
  value: string;
  checked: boolean;
}

function Checkbox({
  name,
  options,
  onValueChange,
  ...rest
}: CheckboxProps): JSX.Element {
  const inputRefs = useRef<InputRefProps[]>([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  const [checkedValues, setCheckedValues] = useState<string[]>(defaultValue);

  const mergeOnValueChange = useCallback(
    (isChecked: boolean, value: string) => {
      setCheckedValues(state => {
        if (isChecked) {
          return [...state, value];
        }

        return state.filter(stateValue => stateValue !== value);
      });

      onValueChange && onValueChange(isChecked);
    },
    [],
  );

  useEffect(() => {
    inputRefs.current.forEach((ref, index) => {
      ref.value = options[index].value;
      ref.checked = checkedValues.includes(options[index].value);
    });
  }, [checkedValues, options]);

  useEffect(() => {
    registerField<string[]>({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: InputRefProps[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      setValue: (_, values: string[]) => setCheckedValues(values),
      clearValue: () => setCheckedValues([]),
    });
  }, [fieldName, registerField]);

  return (
    <>
      {options.map((option, index) => (
        <View key={option.value} style={styles.container}>
          <RNCheckbox
            value={checkedValues.includes(option.value)}
            onValueChange={isChecked => {
              mergeOnValueChange(isChecked, option.value);
            }}
            ref={(ref: InputRefProps) => {
              inputRefs.current[index] = ref;
            }}
            {...rest}
          />
          <Text style={styles.label}>{option.label}</Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  label: {
    marginLeft: 8,
  },
});

export default Checkbox;
