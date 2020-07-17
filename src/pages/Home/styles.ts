import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

export const PageButton = styled(RectButton)`
  background: #6633cc;
  width: 100%;
  height: 56px;
  border-radius: 5px;

  align-items: center;
  justify-content: center;

  margin-bottom: 8px;
`;

export const PageButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;
