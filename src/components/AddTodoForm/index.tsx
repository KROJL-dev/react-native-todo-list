import React, { useState, useRef } from 'react';

import { StyleSheet, Animated,Dimensions } from 'react-native';

import DatePicker from 'react-native-date-picker';

import dayjs from 'dayjs';

import {
  Input,
  Select,
  CheckIcon,
  Container,
  Stack,
  Button,
  Text,
  Alert,
  Center,
  View,
} from 'native-base';

import { toggleStartedAnimation } from '../../utils/toggleStartedAnimation';

import { Categories } from '../../models/todo';

import { useStore } from '../../store/store';

const AddTodoForm: React.FC<{}> = () => {
  const swipeAnimationError = useRef(new Animated.Value(700)).current;
  const swipeAnimationSubmitBtn = useRef(new Animated.Value(0)).current;
  const swipeAnimationDatePicker = useRef(new Animated.Value(0)).current

  const [category, setCategory] = useState<Categories>(Categories.home);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState(new Date());

  const [errorMessage, setErrorMessage] = useState<string>("");
  const { todoStore } = useStore();

  const handleSetCategories = (categoryString: string) => {
    switch (categoryString) {
      case 'home':
        setCategory(Categories.home);
        break;
      case 'work':
        setCategory(Categories.work);
        break;
      case 'study':
        setCategory(Categories.study);
        break;
    }
  };

  const handleError = (): boolean => {
    let isError = false;
    let errorMsg = '';

    if (title.length === 0) {
      errorMsg = 'Min length for title: 2';
      isError = true;
    }

    if (description.split(' ').length < 2) {
      isError = true;
      if (errorMsg.length) {
        errorMsg = errorMsg + '.' + 'Min word count for description: 2';
      } else {
        errorMsg = 'Min word count for description: 2';
      }
    }
    if (description.length > 80) {
      isError = true;
      if (errorMsg.length) {
        errorMsg = errorMsg + '.' + 'To long description';
      } else {
        errorMsg = 'To long description';
      }
    }
    setErrorMessage(errorMsg);
    return isError;
  };

  const handleAddTodo = () => {
    if (!handleError()) {
      todoStore.addTodo({
        todoTitle: title,
        todoDescription: description,
        todoCategory: category,
        todoDeadline: date,
      });
    } else {
      toggleStartedAnimation(400, swipeAnimationError);
      toggleStartedAnimation(700, swipeAnimationSubmitBtn);
      setTimeout(() => {
        setErrorMessage('');
        toggleStartedAnimation(0, swipeAnimationSubmitBtn);
        toggleStartedAnimation(700, swipeAnimationError);

      }, 2500);
    }
  };

  return (
    <Container
      w={Dimensions.get('window').width}
      
    >
      <Center w="100%">
        <Stack space={4} w="100%">
          <Input
            size="lg"
            w="100%"
            placeholder="Title"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            _light={{
              placeholderTextColor: 'blue.400',
            }}
            _dark={{
              placeholderTextColor: 'blue.50',
            }}
            borderColor="blue.600"
          />
          <Input
            size="lg"
            w="100%"
            placeholder="Description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
            _light={{
              placeholderTextColor: 'blue.400',
            }}
            _dark={{
              placeholderTextColor: 'blue.50',
            }}
            borderColor="blue.600"
          />
          <Select
            borderColor="blue.600"
            selectedValue={Categories[category]}
            minWidth={200}
            accessibilityLabel="Select category"
            placeholder="Select category"
            onValueChange={(itemValue) => handleSetCategories(itemValue)}
            _selectedItem={{
              bg: 'cyan.600',
              endIcon: <CheckIcon size={4} />,
            }}
          >
            <Select.Item label="Work" value="work" />
            <Select.Item label="Home" value="home" />
            <Select.Item label="Study" value="study" />
          </Select>
          {/* <Center>
            <Text>
              Current deadline:
              <Text style={{ alignItems: 'stretch' }}>
                {dayjs(date).format('DD/MM HH:mm:ss')}
              </Text>
            </Text>
          </Center> */}
          <Center>
            <Animated.View
              style={{
                transform: [{ translateX: swipeAnimationDatePicker }],
              }}
            >
              <DatePicker date={date} onDateChange={setDate} />
            </Animated.View>
          </Center>
          <Animated.View
            style={{
              transform: [{ translateY: swipeAnimationSubmitBtn }],
            }}
          >
            <Button
              onPress={handleAddTodo}
            >
              Submit
            </Button>
          </Animated.View>
        </Stack>
        <Animated.View
          style={{
            transform: [{ translateY: swipeAnimationError }],
            position: 'absolute',
            top: 25,  
          }}
        >
          <Center>
            <Alert>
              <Alert.Icon />
              <Alert.Title>EROR</Alert.Title>
              <Alert.Description>
                <Stack>
                  {errorMessage?.split('.').map((error, i) => (
                    <Text key={i}>{error}</Text>
                  ))}
                </Stack>
              </Alert.Description>
            </Alert>
          </Center>
        </Animated.View>
      </Center>
    </Container>
  );
};
export default AddTodoForm;

 const styles = StyleSheet.create({
   submitBtn : {
     marginBottom:10
   }
 })
