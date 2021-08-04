import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';

import { toggleStartedAnimation } from '../../utils/toggleStartedAnimation';

import { Button, Heading, View, Center, Flex } from 'native-base';

import { observer } from 'mobx-react';

import { useStore } from '../../store/store';

import TodoList from '../../components/TodoList/index';
import AddTodoForm from '../../components/AddTodoForm/index';

const HomePage: React.FC<{}> = () => {
  const swiperAnimationTodoList = useRef(new Animated.Value(0)).current;
  const swiperAnimationAddForm = useRef(new Animated.Value(400)).current;

  const [isAddTodo, setIsAddTodo] = useState<boolean>(false);

  const { userStore, todoStore } = useStore();

  useEffect(() => {
    if (isAddTodo) {
      toggleStartedAnimation(400, swiperAnimationTodoList);
      toggleStartedAnimation(0, swiperAnimationAddForm);
    } else {
      toggleStartedAnimation(0, swiperAnimationTodoList);
      toggleStartedAnimation(400, swiperAnimationAddForm);
    }
  }, [isAddTodo]);

  useEffect(() => {
    if (todoStore.todoList.length === 0) {
      setIsAddTodo(true);
    }
  }, [todoStore.todoList.length]);

  return (
    <View style={styles.container} w="100%">
      <Heading>
        Hello,{' '}
        {userStore.currentUser?.firstName.charAt(0).toUpperCase() +
          '' +
          userStore.currentUser?.firstName.slice(1)}
      </Heading>
      <Text style={styles.text}>The nearest tasks</Text>
      <Center>
        <Animated.View
          style={{
            transform: [{ translateX: swiperAnimationAddForm }],

            ...styles.addForm,
          }}
        >
          <AddTodoForm />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ translateX: swiperAnimationTodoList }],
            position: 'absolute',
            top: 0,
          }}
        >
          {todoStore.todoList.length > 0 ? <TodoList /> : null}
        </Animated.View>
      </Center>
      <View style={styles.btnForm}>
        <Flex direction="column" alignItems="center">
          {todoStore.todoList.length > 0 && (
            <Button
              style={styles.buttonAddTodo}
              onPress={() => {
                setIsAddTodo(!isAddTodo);
              }}
            >
              {isAddTodo ? 'todo list' : 'add todo'}
            </Button>
          )}
          <Text style={(styles.text, styles.textFilters)}>Filters</Text>
          <Flex w="92.5%" direction="row" justifyContent="space-between">
            <Button
              style={styles.button}
              onPress={() => {
                console.log('by date');
              }}
            >
              by date
            </Button>
            <Button
              style={styles.button}
              onPress={() => {
                console.log('show all');
              }}
            >
              show all
            </Button>
          </Flex>
        </Flex>
      </View>
    </View>
  );
};
export default observer(HomePage);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: { width: 140, marginBottom: 20 },
  buttonAddTodo: { width: 345, marginTop: 20, marginBottom: 5 },
  text: { marginBottom: 20, fontSize: 20 },
  textFilters: {
    fontSize: 20,
    marginBottom: 5,
  },
  btnForm: {
    position: 'absolute',
    top: 530,
    left: 10,
  },
  addForm: {
    position: 'absolute',
    top: 0,
    width: 400,
    left: 15,
  },
});
