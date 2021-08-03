import React from 'react';

import { Text } from 'react-native';

import { observer } from 'mobx-react';

import { Center, Input, Button, Stack } from 'native-base';
import { useForm, Controller } from 'react-hook-form';

import { useStore } from '../../store/store';
import { IUser } from '../../models/user';

interface IProps {
  handleLoading: Function;
}
const Login: React.FC<IProps> = ({ handleLoading }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { userStore } = useStore();

  const onSubmit = (data: IUser) => {
    handleLoading(true);
     
    setTimeout(
      () =>
        userStore.login(data.firstName, data.lastName).then(() => {
          handleLoading(false);
        }),
      1000
    );
  };

  return (
    <Center w="100%" px={8}>
      <Stack space={4} w="100%">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              size="2xl"
              width="100%"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
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
              width="100%"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="last name"
            />
          )}
          name="lastName"
          defaultValue=""
        />
        {errors.lastName && <Text>This is required.</Text>}
        <Button onPress={handleSubmit(onSubmit)} >Submit</Button>
      </Stack>
    </Center>
  );
};
export default observer(Login);
