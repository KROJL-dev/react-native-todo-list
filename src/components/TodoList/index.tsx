import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { observer } from 'mobx-react';

import { useStore } from '../../store/store';

import TodoCard from '../TodoCard/index';
const TodoList: React.FC<{}> = () => {
  const { todoStore } = useStore();
  useEffect(() => {
    console.log('TodoList', todoStore.todoList);
  }, [todoStore.todoList]);
  return (
    <ScrollView horizontal={true}>
      {todoStore.todoList.map((todo) => (
        <TodoCard todo={todo} key={todo.id} />
      ))}
    </ScrollView>
  );
};
export default observer(TodoList);
