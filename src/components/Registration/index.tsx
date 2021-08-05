import React from 'react';

import { Center, Input, Button, Stack, Text } from 'native-base';

import { useForm, Controller } from 'react-hook-form';

import { useStore } from '../../store/store';
import { IUser } from '../../models/user';

interface IProps {
  handleLoading: Function;
}

const Registration: React.FC<IProps> = ({ handleLoading }) => {
  const { userStore } = useStore();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleSubmitRegistration = (data: IUser) => {
    handleLoading(true);

    setTimeout(
      () =>
        userStore
          .registration(
            data.firstName.toLocaleLowerCase(),
            data.lastName.toLocaleLowerCase()
          )
          .then(() => {
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
        <Button onPress={handleSubmit(handleSubmitRegistration)}>Submit</Button>
      </Stack>
    </Center>
  );
};
export default Registration;
