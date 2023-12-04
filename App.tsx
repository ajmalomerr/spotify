import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/BottomTabNavigator';
import PlayerProvider from './src/Provider/PlayerProvider';
import ApolloClientProvider from './src/Provider/ApolloClientProvider';

const App = () => {
  return (
    <ApolloClientProvider>
      <PlayerProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </PlayerProvider>
    </ApolloClientProvider>
  );
};

export default App;
