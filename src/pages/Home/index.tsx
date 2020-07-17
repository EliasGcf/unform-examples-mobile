import React, { useMemo, useCallback } from 'react';
import { Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import unformLogo from '../../assets/unform-logo.png';

import { Container, PageButton, PageButtonText } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const examples = useMemo<string[]>(() => {
    return ['react-native-picker', 'checkbox'];
  }, []);

  const handlePageButton = useCallback((page: string) => {
    navigation.navigate(page);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Container>
        <Image
          style={{
            height: 60,
            resizeMode: 'contain',
            marginBottom: 32,
          }}
          source={unformLogo}
        />

        {examples.map(example => (
          <PageButton key={example} onPress={() => handlePageButton(example)}>
            <PageButtonText>{example}</PageButtonText>
          </PageButton>
        ))}
      </Container>
    </ScrollView>
  );
};

export default Home;
