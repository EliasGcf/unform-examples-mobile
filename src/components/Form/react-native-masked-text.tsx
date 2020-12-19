import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useField } from '@unform/core';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

interface InputMaskRef extends TextInputMask {
  value: string;
  rawValue: string;
}

interface InputMaskProps extends Omit<TextInputMaskProps, 'defaultValue'> {
  name: string;
}

function InputMask({
  name,
  onChangeText,
  ...rest
}: InputMaskProps): JSX.Element {
  const inputRef = useRef<InputMaskRef>(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  const [value, setValue] = useState(defaultValue);
  const [rawValue, setRawValue] = useState(defaultValue);

  const mergeOnChaneText = useCallback((text, rawValeu) => {
    setValue(text);
    setRawValue(rawValeu);

    onChangeText && onChangeText(text, rawValeu);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
      inputRef.current.rawValue = rawValue;
    }
  }, [value, rawValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: InputMaskRef) => {
        return ref.rawValue;
      },
      setValue: (_, newValue: string) => {
        setValue(newValue);
        setRawValue(newValue);
      },
      clearValue: () => {
        setValue('');
        setRawValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <TextInputMask
      ref={inputRef}
      value={value}
      style={styles.inputMask}
      includeRawValueInChangeText
      onChangeText={mergeOnChaneText}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  inputMask: {
    backgroundColor: '#ddd',
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default InputMask;
