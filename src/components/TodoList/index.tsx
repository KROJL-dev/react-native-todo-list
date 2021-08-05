import React from 'react';

import { Center, View } from 'native-base';

import Swiper from 'react-native-swiper';

import { observer } from 'mobx-react';

import { ITodo } from '../../models/todo';

import TodoCard from '../TodoCard/index';

interface IProps {
  todoList: ITodo[];
}
const TodoList: React.FC<IProps> = ({ todoList }) => {
  return (
    <View>
      <Swiper horizontal={true} loop={false}>
        {todoList.map((todo) => (
          <Center key={todo.id}>
            <TodoCard todo={todo} />
          </Center>
        ))}
      </Swiper>
    </View>
  );
};
export default observer(TodoList);
