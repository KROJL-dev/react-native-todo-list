import React, { Component } from 'react';
import { View, Text, LogBox } from 'react-native';

 import { observer } from 'mobx-react';

import { NativeBaseProvider } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './containers/LoginPage';

import { useStore } from './store/store';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const App: React.FC<{}> = () => {
  const Stack = createNativeStackNavigator();

  const { userStore } = useStore();

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator >
          {userStore.isUser ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginPage} />
          )}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default observer(App);
