import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import MainScreen from './components/main';
import SendScreen from './components/send';
import ReceiveScreen from './components/receive';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App=()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Send" component={SendScreen} />
        <Stack.Screen name="Receive" component={ReceiveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
