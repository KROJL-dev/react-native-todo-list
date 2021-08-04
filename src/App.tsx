import React, { useEffect } from 'react';
import { View, Text, LogBox } from 'react-native';

import { observer } from 'mobx-react';

import { NativeBaseProvider } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthorizationPage from './containers/AuthorizationScreen/AuthorizationPage';
import HomePage from './containers/HomeScreen/Homepage';

import { useStore } from './store/store';

import { IUser } from './models/user';

import AsyncStorage from '@react-native-community/async-storage';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App: React.FC<{}> = () => {
  const Stack = createNativeStackNavigator();

  const { userStore } = useStore();

   useEffect(() => {
     (async () => {
       userStore.checkAfterReload();
       let currentUser = await AsyncStorage.getItem('currentUser');
       if (currentUser !== null) {
         let newCurrentUser = JSON.parse(currentUser) as unknown as IUser;

         userStore.login(newCurrentUser.firstName, newCurrentUser.lastName);
       }
     })();
   }, []);
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          {userStore.isCanGoHomePage ? (
            <Stack.Screen name="Home" component={HomePage} />
          ) : (
            <Stack.Screen name="Authorization" component={AuthorizationPage} />
          )}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default observer(App);
