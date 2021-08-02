import React, { useState, useEffect } from 'react';

import { Image, StyleSheet, Text } from 'react-native';

import { observer } from 'mobx-react';

import {
  Center,
  Input,
  Button,
  Spinner,
  HStack,
  Heading,
  Alert,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';

import todoLogo from '../../assets/img/task-logo.png';

import { useStore } from '../../store/store';
import { IUser } from '../../models/user';

const LoginPage: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const { userStore } = useStore();

  const [loading, setIsLoading] = useState<boolean>(false);
   
  const onSubmit = (data: IUser) => {
    setIsLoading(true);
    setTimeout(
      () =>
        userStore.checkUser(data.firstName, data.lastName).then(() => {
          setIsLoading(false);
        }),
      1000
    );
  };

  
  return (
    <Center>
      <Image source={todoLogo} style={{ marginVertical: 20 }} />
      {loading ? (
        <HStack space={2}>
          <Heading color="primary.300">Your todo list </Heading>
          <Spinner accessibilityLabel="Loading posts" />
        </HStack>
      ) : (
        <Center>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="2xl"
                width="80%"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={style.input}
                placeholder="first name"
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="2xl"
                width="80%"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={style.input}
                placeholder="last name"
              />
            )}
            name="lastName"
            defaultValue=""
          />
          {errors.lastName && <Text>This is required.</Text>}
          <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
          {userStore.isUser !== undefined && !userStore.isUser ? (
            <Alert w="100%" style={{marginTop:20}}>
              <Alert.Icon />
              <Alert.Title>Wrong password</Alert.Title>
              <Alert.Description>Wrong credentials. Please, try again</Alert.Description>
            </Alert>
          ) : null}
        </Center>
      )}
    </Center>
  );

  // return (
  //   <Center>
  //     <Image source={todoLogo} />
  //   </Center>
  // );
};
export default observer(LoginPage);

const style = StyleSheet.create({
  input: {
    marginBottom: 20,
    minWidth: 300,
  },
});
