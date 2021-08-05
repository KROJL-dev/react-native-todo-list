import React, { useEffect } from 'react';
import {LogBox, Button } from 'react-native';

import { observer } from 'mobx-react';

import { NativeBaseProvider } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthorizationPage from './containers/AuthorizationScreen/AuthorizationPage';
import HomePage from './containers/HomeScreen/Homepage';

import { useStore } from './store/store';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App: React.FC<{}> = () => {
  const Stack = createNativeStackNavigator();

  const { userStore, todoStore } = useStore();

  useEffect(() => {
    if (userStore.currentUser?.userId !== undefined) {
      todoStore.checkTodoAfterReload(userStore.currentUser?.userId);
    }
  }, [userStore.currentUser?.userId]);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          {userStore.isCanGoHomePage ? (
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{
                headerRight: () => (
                  <Button
                    onPress={() => {
                      userStore.logout();
                    }}
                    title="Logout"
                  />
                ),
              }}
            />
          ) : (
            <Stack.Screen name="Authorization" component={AuthorizationPage} />
          )}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default observer(App);
