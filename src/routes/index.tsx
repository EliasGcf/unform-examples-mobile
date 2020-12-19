import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '~/pages/Home';
import CheckboxPage from '~/pages/checkbox';
import PickerPage from '~/pages/react-native-picker';
import InputMaskPage from '~/pages/react-native-masked-text';
import PickerSelectPage from '~/pages/react-native-picker-select';
import Header from '~/components/Header';

const Drawer = createDrawerNavigator();

function Routes(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen
          name="Checkbox"
          component={CheckboxPage}
          options={{ header: () => <Header />, headerShown: true }}
        />
        <Drawer.Screen
          name="Picker"
          component={PickerPage}
          options={{ header: () => <Header />, headerShown: true }}
        />
        <Drawer.Screen
          name="PickerSelect"
          component={PickerSelectPage}
          options={{ header: () => <Header />, headerShown: true }}
        />
        <Drawer.Screen
          name="InputMask"
          component={InputMaskPage}
          options={{ header: () => <Header />, headerShown: true }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
