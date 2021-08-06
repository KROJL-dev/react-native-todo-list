import React, { useEffect } from 'react';
import { LogBox, Button, AppRegistry } from 'react-native';

import { observer } from 'mobx-react';

import { NativeBaseProvider, Flex, Image } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthorizationPage from './containers/AuthorizationScreen/AuthorizationPage';
import HomePage from './containers/HomeScreen/Homepage';

import { useStore } from './store/store';
import { pushNotifications } from './services';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const SETTINGSICON = 'https://image.flaticon.com/icons/png/512/957/957639.png';

AppRegistry.registerComponent('Your Todo List', () => App);

pushNotifications.configure();

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
                  <Flex direction="row">
                    <Button
                      onPress={() => {
                        userStore.logout();
                      }}
                      title="Logout"
                    />
                    <Image
                      source={{ uri: SETTINGSICON }}
                      alt="KRASAVA"
                      style={{ height: 40, width: 40, marginLeft: 15 }}
                    />
                  </Flex>
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
