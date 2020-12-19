import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';

import { FormHandles } from '@unform/core';
import Button from '~/components/Button';
import Checkbox from '~/components/Form/checkbox';
import Header from '~/components/Header';

function CheckboxPage(): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const checkboxOptions = [
    { value: 'node', label: 'Node' },
    { value: 'react', label: 'ReactJS' },
  ];

  const handleSubmit = useCallback(data => {
    Alert.alert(JSON.stringify(data));
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://storage.googleapis.com/golden-wind/unform/unform.png',
        }}
      />
      <Form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
        <Checkbox name="techs" options={checkboxOptions} />

        <Button
          title="Submit"
          style={{ marginTop: 16 }}
          onPress={() => formRef.current?.submitForm()}
        />
        <Button
          title="Set Value"
          style={{ marginTop: 16 }}
          onPress={() => {
            formRef.current?.setFieldValue('techs', [checkboxOptions[1].value]);
          }}
        />
        <Button
          title="Clear Value"
          style={{ marginTop: 16 }}
          onPress={() => formRef.current?.clearField('techs')}
        />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 120,
    height: 150,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  form: {
    width: '100%',
    paddingHorizontal: 32,
  },
});

export default CheckboxPage;
