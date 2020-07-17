import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import RNPickerPage from './pages/react-native-picker';
import CheckboxPage from './pages/checkbox';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="react-native-picker" component={RNPickerPage} />
        <Stack.Screen name="checkbox" component={CheckboxPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
