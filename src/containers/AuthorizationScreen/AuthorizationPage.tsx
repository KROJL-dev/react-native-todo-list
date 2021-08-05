import React, { useState, useEffect, useRef } from 'react';

import { Image, Animated } from 'react-native';

import { observer } from 'mobx-react';

import {
  Center,
  Spinner,
  HStack,
  Heading,
  Alert,
  View,
} from 'native-base';
 
import { toggleStartedAnimation } from '../../utils/toggleStartedAnimation';

import todoLogo from '../../assets/img/task-logo.png';

import { useStore } from '../../store/store';

import Login from '../../components/Login';

import Registration from '../../components/Registration';

const LoginPage: React.FC<{}> = () => {

  const swipeAnimationLogin = useRef(new Animated.Value(0)).current;
  const swipeAnimationRegistration = useRef(new Animated.Value(-300)).current;
  const swipeAnimationLoading = useRef(new Animated.Value(500)).current;
  const swipeAnimationError = useRef(new Animated.Value(700)).current;

  const { userStore } = useStore();

  const [loading, setIsLoading] = useState<boolean>(false);
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  useEffect(() => {
    if (isRegistration) {
      toggleStartedAnimation(350, swipeAnimationLogin);
      toggleStartedAnimation(0, swipeAnimationRegistration);
    } else {
      toggleStartedAnimation(0, swipeAnimationLogin);
      toggleStartedAnimation(-300, swipeAnimationRegistration);
    }
  }, [isRegistration]);

  useEffect(() => {
    if (loading) {
      toggleStartedAnimation(350, swipeAnimationLogin, 200);
      toggleStartedAnimation(500, swipeAnimationLoading, 200);
      toggleStartedAnimation(-300, swipeAnimationRegistration);
    } else {
      toggleStartedAnimation(0, swipeAnimationLogin);
      toggleStartedAnimation(700, swipeAnimationLoading);
    }
  }, [loading]);

  useEffect(() => {
    if (!userStore.isUser && userStore.isUser !== undefined) {
      toggleStartedAnimation(500, swipeAnimationError);
    } else {
      toggleStartedAnimation(700, swipeAnimationError);
    }
  }, [userStore.isUser]);

  return (
    <Center>
      <Image source={todoLogo} style={{ marginVertical: 20 }} />
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          transform: [{ translateY: swipeAnimationLoading }],
        }}
      >
        <HStack space={2}>
          <Heading color="primary.300">Your todo list </Heading>
          <Spinner accessibilityLabel="Loading posts" />
        </HStack>
      </Animated.View>

      <Center>
        {/* REGISTRATION SECTION */}
        <Animated.View
          style={{
            transform: [{ translateX: swipeAnimationRegistration }],
            position: 'absolute',
            top: 0,
          }}
        >
          <Registration handleLoading={setIsLoading} />
        </Animated.View>
        {/* REGISTRATION SECTION */}

        {/* LOGIN SECTION */}
        <Animated.View
          style={{
            transform: [{ translateX: swipeAnimationLogin }],
            position: 'absolute',
            top: 0,
            width: 250,
          }}
        >
          <Login
            handleLoading={setIsLoading}
            handleIsRegistration={() => {
              setIsRegistration(!isRegistration);
            }}
          />
        </Animated.View>
        {/* LOGIN SECTION */}
      </Center>
      <Animated.View
        style={{
          transform: [{ translateY: swipeAnimationError }],
          position: 'absolute',
          top: 0,
          left: 50,
        }}
      >
        <View style={{ position: 'absolute', top: 0, left: 40 }}>
          <Alert w="100%">
            <Alert.Icon />
            <Alert.Title>EROR</Alert.Title>
            <Alert.Description>{userStore.errorMessage}</Alert.Description>
          </Alert>
        </View>
      </Animated.View>
    </Center>
  );
};
export default observer(LoginPage);
