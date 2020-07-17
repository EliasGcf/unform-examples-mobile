import React, { useMemo, useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { RNPicker } from '../../components/Form';

import { Container, Logo } from './styles';
import SubmitButton from '../../components/SubmitButton';

const RNPickerPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const pickerOptions = useMemo(() => {
    return [
      { value: 'diego3g', label: 'Diego Fernandes' },
      { value: 'EliasGcf', label: 'Elias Gabriel' },
    ];
  }, []);

  const handleSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Logo
          style={{ resizeMode: 'contain' }}
          source={{
            uri: 'https://storage.googleapis.com/golden-wind/unform/unform.png',
          }}
        />

        <RNPicker name="user" options={pickerOptions} />

        <SubmitButton
          title="Send"
          onPress={() => formRef.current?.submitForm()}
        />
      </Form>
    </Container>
  );
};

export default RNPickerPage;
