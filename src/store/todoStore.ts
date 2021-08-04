import { action, makeAutoObservable, observable } from 'mobx';
import { ITodo, Categories } from '../models/todo';
import { RootStore } from './store';

import AsyncStorage from '@react-native-community/async-storage';

import generateId from '../utils/generateId'
import dayjs from 'dayjs';

interface IAddTodo {
  todoTitle: string;
  todoDescription: string;
  todoCategory: Categories;
  todoDeadline: Date
}
export class TodoStore {
  rootStore: RootStore;

  @observable todoList: ITodo[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    (async () => {
      
      let todoList = await AsyncStorage.getItem('todoList');
      if (todoList !== null) {
        let newTodoList = JSON.parse(todoList) as unknown as ITodo[];
        this.todoList = newTodoList
      }
    })();

    makeAutoObservable(this);
  }

  @action
  addTodo = async({
    todoTitle,
    todoDescription,
    todoCategory,
    todoDeadline,
  }: IAddTodo) => {
    this.todoList = [
      ...this.todoList,
      {
        title: todoTitle,
        description: todoDescription,
        category: Categories[todoCategory],
        createdAt: dayjs(new Date()).format('DD/MM HH:mm:ss'),
        id: generateId(),
        isComplited: false,
        deadline: dayjs(todoDeadline).format('DD/MM HH:mm:ss'),
      },
    ];
    await AsyncStorage.setItem('todoList', JSON.stringify(this.todoList));
  };

  @action
  deleteTodo = (id: string) => {
    console.log('todoDelete');
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  };
}
