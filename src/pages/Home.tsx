import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import Button from '~/components/Button';

function Home(): JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Click on the Button</Text>
      <Button
        title="Open menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

export default Home;
