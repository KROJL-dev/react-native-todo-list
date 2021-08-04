import React from 'react';
import { View } from 'react-native';

import Swiper from 'react-native-swiper';

import { observer } from 'mobx-react';

import { useStore } from '../../store/store';

import TodoCard from '../TodoCard/index';
import { Center } from 'native-base';


const TodoList: React.FC<{}> = () => {
  const { todoStore } = useStore();

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

