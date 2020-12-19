import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

function App(): JSX.Element {
  return (
    <>
      <StatusBar backgroundColor="#f9fafc" barStyle="dark-content" />
      <Routes />
    </>
  );
}

export default App;
