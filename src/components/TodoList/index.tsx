import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';

import Swiper from 'react-native-swiper';

import { observer } from 'mobx-react';

import { useStore } from '../../store/store';

import TodoCard from '../TodoCard/index';
import { Center } from 'native-base';
import { StyleSheet } from 'react-native';

const TodoList: React.FC<{}> = () => {
  const { todoStore } = useStore();
 
  useEffect(() => {}, [todoStore]);
  return (
    <View>
      <Swiper horizontal={true} loop={false}>
        {todoStore.todoList.map((todo) => (
          <Center key={todo.id}>
            <TodoCard todo={todo} />
          </Center>
        ))}
      </Swiper>
    </View>
  );
};
export default observer(TodoList);

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  paginationStyle: {
    position: 'absolute',

    zIndex: 199999,
  },
  paginationText: {
    color: 'white',
    fontSize: 20,
  },
});
