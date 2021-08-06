import React, { useState, useEffect, useRef } from 'react';

import { StyleSheet, Text, Animated, Dimensions } from 'react-native';

import { Button, Heading, View, Center, Flex, Container } from 'native-base';

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
  const [currentTodosList, setCurrentTodoList] = useState<ITodo[]>([]);

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
    } else {
      setCurrentTodoList(todoStore.todoList);
      setIsShowALl(false);
    }
  }, [todoStore.todoList]);

  useEffect(() => {
    if (isShowAll) {
      setCurrentTodoList([
        ...todoStore.complitedTodoList,
        ...todoStore.todoList,
      ]);
    } else {
      setCurrentTodoList(todoStore.todoList);
    }
  }, [isShowAll]);
  return (
    <Container h={Dimensions.get('window').height - 10}>
      <Flex
        direction="column"
        style={styles.container}
        justifyContent="space-between"
      >
        <Flex direction="column">
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
        </Flex>
        <Center
          w="100%"
          style={
            isAddTodo
              ? {}
              : {
                  height: Dimensions.get('window').height / 2,
                }
          }
        >
          <Animated.View
            style={{
              transform: [{ translateX: swiperAnimationAddForm }],
              ...styles.addForm,
              zIndex: 99999999999999999999999999999,
            }}
          >
            <Center
              style={{
                height: Dimensions.get('window').height,
                maxHeight: 480,
              }}
            >
              <AddTodoForm />
            </Center>
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ translateX: swiperAnimationTodoList }],
              position: 'absolute',
              top: 0,
            }}
          >
            {currentTodosList.length > 0 && (
              <TodoList todoList={currentTodosList} />
            )}
          </Animated.View>
        </Center>

        <Flex alignItems="center" direction="column" w="100%">
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
          {!isAddTodo && (
            <Center w="100%">
              <Text style={styles.textFilters}>Filters</Text>
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
            </Center>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};
export default observer(HomePage);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 90,
  },
  button: { width: 140 },
  buttonAddTodo: { width: 320, marginBottom: 5 },
  text: { marginBottom: 10, fontSize: 20 },
  textFilters: {
    fontSize: 20,
    marginVertical: 5,
  },

  addForm: {},
});
