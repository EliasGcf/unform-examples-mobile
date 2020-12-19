import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';

import { FormHandles } from '@unform/core';
import Button from '~/components/Button';
import PickerSelect, {
  PickerSelectItem,
} from '~/components/Form/react-native-picker-select';

function PickerSelectPage(): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const pickerOptions: PickerSelectItem[] = [
    { value: 'diego3g', label: 'Diego Fernandes' },
    { value: 'EliasGcf', label: 'Elias Gabriel' },
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
        <PickerSelect name="user" items={pickerOptions} />

        <Button
          title="Submit"
          style={{ marginTop: 16 }}
          onPress={() => formRef.current?.submitForm()}
        />

        <Button
          title="Set Value"
          style={{ marginTop: 16 }}
          onPress={() => {
            formRef.current?.setFieldValue('user', pickerOptions[1].value);
          }}
        />

        <Button
          title="Clear Value"
          style={{ marginTop: 16 }}
          onPress={() => formRef.current?.clearField('user')}
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

export default PickerSelectPage;
