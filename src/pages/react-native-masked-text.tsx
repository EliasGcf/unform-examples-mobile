import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Keyboard,
} from 'react-native';

import { FormHandles } from '@unform/core';
import Button from '~/components/Button';
import InputMask from '~/components/Form/react-native-masked-text';

function InputMaskPage(): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(data => {
    Alert.alert(JSON.stringify(data));
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://storage.googleapis.com/golden-wind/unform/unform.png',
          }}
        />
        <Form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
          <InputMask name="cpf" type="cpf" placeholder="123.456.789-00" />

          <Button
            title="Submit"
            style={{ marginTop: 16 }}
            onPress={() => {
              formRef.current?.submitForm();
              Keyboard.dismiss();
            }}
          />
          <Button
            title="Set Value"
            style={{ marginTop: 16 }}
            onPress={() => {
              formRef.current?.setFieldValue('cpf', '11111111111');
            }}
          />
          <Button
            title="Clear Value"
            style={{ marginTop: 16 }}
            onPress={() => formRef.current?.clearField('cpf')}
          />
        </Form>
      </View>
    </KeyboardAvoidingView>
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

export default InputMaskPage;
