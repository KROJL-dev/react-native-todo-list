import React, { useState, useEffect, useRef } from 'react';

import { Image, StyleSheet, Animated } from 'react-native';

import { observer } from 'mobx-react';

import {
  Center,
  Input,
  Button,
  Spinner,
  HStack,
  Heading,
  Alert,
  Stack,
  View,
  Text,
} from 'native-base';

import todoLogo from '../../assets/img/task-logo.png';

import { useStore } from '../../store/store';

import Login from '../../components/Login';
import Registration from '../../components/Registration';

const LoginPage: React.FC<{}> = () => {
  const swipeAnimationLogin = useRef(new Animated.Value(0)).current;
  const swipeAnimationRegistration = useRef(new Animated.Value(-300)).current;
  const swipeAnimationLoading = useRef(new Animated.Value(100)).current;
  const swipeAnimationError = useRef(new Animated.Value(700)).current;
  const { userStore } = useStore();

  const [loading, setIsLoading] = useState<boolean>(false);
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  useEffect(() => {
    if (isRegistration) {
      toggleStartedAnimation(300, swipeAnimationLogin);
      toggleStartedAnimation(0, swipeAnimationRegistration);
    } else {
      toggleStartedAnimation(0, swipeAnimationLogin);
      toggleStartedAnimation(-300, swipeAnimationRegistration);
    }
  }, [isRegistration]);

  useEffect(() => {
    console.log(userStore.isUser, 'userStore.isUser');
    console.log('loading', loading);
    if (loading) {
      toggleStartedAnimation(350, swipeAnimationLogin, 200);
      toggleStartedAnimation(500, swipeAnimationLoading, 200);
    } else {
      toggleStartedAnimation(0, swipeAnimationLogin);
      toggleStartedAnimation(700, swipeAnimationLoading);
    }
  }, [loading]);

  useEffect(()=>{
    if(!userStore.isUser && userStore.isUser !==undefined){
      toggleStartedAnimation(500, swipeAnimationError);
    }
    else{
      toggleStartedAnimation(700, swipeAnimationError);
    }
  }, [userStore.isUser])
  const toggleStartedAnimation = (
    value: number,
    ref: Animated.Value,
    duration: number = 400
  ) => {
    Animated.timing(ref, {
      toValue: value,
      duration: duration,
      easing: (v) => v,
      useNativeDriver: true,
    }).start();
  };

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
          }}
        >
          <Login handleLoading={setIsLoading} />
          <Button onPress={() => setIsRegistration(!isRegistration)} mt={4}>
            reg
          </Button>
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
        <View style={{ position: 'absolute', top: 0 }}>
          <Alert w="100%">
            <Alert.Icon />
            <Alert.Title>Wrong credential</Alert.Title>
            <Alert.Description>Please, try again</Alert.Description>
          </Alert>
        </View>
      </Animated.View>
    </Center>
  );
};
export default observer(LoginPage);

const styles = StyleSheet.create({
  warningMessage: {
    position: 'absolute',
    top: '50',
  },
});
