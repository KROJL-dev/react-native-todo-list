import React from 'react';
import { Dimensions } from 'react-native';
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
    <View
      style={{
         
        height: Dimensions.get('window').height / 2+10,
      }}
    >
      <Swiper
        horizontal={true}
        loop={false}
        
      >
        {todoList.map((todo) => (
          <Center key={todo.id} >
            <TodoCard todo={todo}  />
          </Center>
        ))}
      </Swiper>
    </View>
  );
};
export default observer(TodoList);
