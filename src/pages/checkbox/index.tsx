import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Checkbox } from '../../components/Form';
import SubmitButton from '../../components/SubmitButton';

import { Container, Logo } from './styles';

const CheckboxPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const checkboxOptions = [
    { value: 'node', label: 'Node' },
    { value: 'react', label: 'ReactJS' },
  ];

  const handleSubmit = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{ techs: ['node'] }}
      >
        <Logo
          style={{ resizeMode: 'contain' }}
          source={{
            uri: 'https://storage.googleapis.com/golden-wind/unform/unform.png',
          }}
        />

        <Checkbox name="techs" options={checkboxOptions} />

        <SubmitButton
          title="Send"
          onPress={() => formRef.current?.submitForm()}
          style={{ marginTop: 8 }}
        />
      </Form>
    </Container>
  );
};

export default CheckboxPage;
