import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { SubmitButtonContainer, SubmitButtonText } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
}

const SubmitButton: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <SubmitButtonContainer {...rest}>
      <SubmitButtonText>{title}</SubmitButtonText>
    </SubmitButtonContainer>
  );
};

export default SubmitButton;
