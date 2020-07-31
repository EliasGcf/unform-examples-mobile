import React, { useMemo, useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { RNPickerSelect } from '../../components/Form';

import { Container, Logo } from './styles';
import SubmitButton from '../../components/SubmitButton';

interface FormData {
  user: string;
}

const RNPickerSelectPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const pickerOptions = useMemo(() => {
    return [
      { value: 'diego3g', label: 'Diego Fernandes' },
      { value: 'EliasGcf', label: 'Elias Gabriel' },
    ];
  }, []);

  const handleSubmit = useCallback((data: FormData) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{ user: pickerOptions[0].value }}
      >
        <Logo
          style={{ resizeMode: 'contain' }}
          source={{
            uri: 'https://storage.googleapis.com/golden-wind/unform/unform.png',
          }}
        />

        <RNPickerSelect name="user" items={pickerOptions} />

        <SubmitButton
          title="Send"
          onPress={() => formRef.current?.submitForm()}
          style={{ marginTop: 8 }}
        />
      </Form>
    </Container>
  );
};

export default RNPickerSelectPage;
