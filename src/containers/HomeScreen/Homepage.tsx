import React, { useState, useEffect, useRef } from 'react';

import { StyleSheet, Text, Animated } from 'react-native';

import { Button, Heading, View, Center, Flex } from 'native-base';

import { observer } from 'mobx-react';

import { useStore } from '../../store/store';

import { toggleStartedAnimation } from '../../utils/toggleStartedAnimation';

import TodoList from '../../components/TodoList/index';
import AddTodoForm from '../../components/AddTodoForm/index';
import { ITodo } from '../../models/todo';

const HomePage: React.FC<{}> = () => {
  const swiperAnimationTodoList = useRef(new Animated.Value(0)).current;
  const swiperAnimationAddForm = useRef(new Animated.Value(400)).current;

  const [isAddTodo, setIsAddTodo] = useState<boolean>(false);
  const [isShowAll, setIsShowALl] = useState<boolean>(false);
  const [currentTodosList, setCurrentTodoList] = useState<ITodo[]>([])

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
    }else{
      setCurrentTodoList(todoStore.todoList);
      setIsShowALl(false)
    }
  }, [todoStore.todoList]);

  useEffect(() => {
    if(isShowAll){
      setCurrentTodoList([...todoStore.complitedTodoList,...todoStore.todoList])
    }
    else{
      setCurrentTodoList(todoStore.todoList);
    }
  }, [isShowAll]);
  return (
    <View style={styles.container} w="100%">
      <Heading>
        Hello,{' '}
        {userStore.currentUser?.firstName.charAt(0).toUpperCase() +
          '' +
          userStore.currentUser?.firstName.slice(1)}
      </Heading>
      {!isAddTodo && (
        <Text style={styles.text}>
          The nearest task{' '}
          {currentTodosList.length > 0 && ':' + todoStore.todoList.length}
        </Text>
      )}
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
          {currentTodosList.length > 0 ? (
            <TodoList todoList={currentTodosList} />
          ) : null}
        </Animated.View>
      </Center>
      <View style={styles.swipeBtn}>
        <Flex w="100%" direction="column" alignItems="center">
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
        </Flex>
      </View>
      <Flex
        alignItems="center"
        direction="column"
        w="100%"
        style={styles.btnForm}
      >
        <Text style={(styles.text, styles.textFilters)}>Filters</Text>
        <Flex direction="row" justifyContent="space-between" w="91%">
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
              setIsShowALl(!isShowAll);
            }}
          >
            {isShowAll ? 'show current' : 'show all'}
          </Button>
        </Flex>
      </Flex>
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
  buttonAddTodo: { width: 320, marginTop: 20, marginBottom: 5 },
  text: { marginBottom: 20, fontSize: 20 },
  textFilters: {
    fontSize: 20,
    marginVertical: 5,
  },
  swipeBtn: {
    position: 'absolute',
    top: 540,
    left: 35,
  },
  btnForm: {
    position: 'absolute',
    top: 600,
    left: 20,
  },
  addForm: {
    position: 'absolute',
    top: 0,
    width: 400,
    left: 15,
  },
});
