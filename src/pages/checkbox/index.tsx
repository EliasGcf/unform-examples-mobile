import React, { useMemo, useRef, useCallback, useEffect } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import SubmitButton from '../../components/SubmitButton';

import { Container, Logo } from './styles';
import { Checkbox } from '../../components/Form';

const CheckboxPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const checkboxOptions = [
    { value: 'node', label: 'Node' },
    { value: 'react', label: 'ReactJS' },
  ];

  const handleSubmit = useCallback(data => {
    console.log(data);
    // formRef.current?.reset();
    // formRef.current?.setData({ users: [] });
    formRef.current?.reset();
  }, []);

  return (
    <Container>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{ users: ['node'] }}
      >
        <Logo
          style={{ resizeMode: 'contain' }}
          source={{
            uri: 'https://storage.googleapis.com/golden-wind/unform/unform.png',
          }}
        />

        <Checkbox name="users" options={checkboxOptions} />

        <SubmitButton
          title="Send"
          onPress={() => formRef.current?.submitForm()}
        />
      </Form>
    </Container>
  );
};

export default CheckboxPage;
