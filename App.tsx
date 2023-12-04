import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/BottomTabNavigator';
import PlayerProvider from './src/Provider/PlayerProvider';

const App = () => {
  return (
    <PlayerProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </PlayerProvider>
  );
};

export default App;
