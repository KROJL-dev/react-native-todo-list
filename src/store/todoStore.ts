import AsyncStorage from '@react-native-community/async-storage';

import { action, makeAutoObservable, observable } from 'mobx';

import dayjs from 'dayjs';

import { ITodo, Categories } from '../models/todo';

import { RootStore } from './store';

import generateId from '../utils/generateId';

interface IAddTodo {
  todoTitle: string;
  todoDescription: string;
  todoCategory: Categories;
  todoDeadline: Date;
}

export class TodoStore {
  rootStore: RootStore;

  @observable todoList: ITodo[] = [];
  @observable complitedTodoList: ITodo[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  checkTodoAfterReload = async (userId: string) => {
    let todoList = await AsyncStorage.getItem(`${userId} todoList`);
    if (todoList !== null) {
      let newTodoList = JSON.parse(todoList) as unknown as ITodo[];
      this.todoList = newTodoList;
    }
  };

  @action
  addToComplitedTodo = (todoId: string):boolean => {
    let todoForAdd = this.todoList.map((todo) => {
      if (todoId === todo.id) {
        return todo;
      }
    });
    if (todoForAdd[0]!==undefined){
      this.complitedTodoList = [...this.complitedTodoList, todoForAdd[0]];
      return true
    }
    else{
      return false
    }
  };

  @action
  addTodo = async ({
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

    await AsyncStorage.setItem(
      `${this.rootStore.userStore.currentUser?.userId} todoList`,
      JSON.stringify(this.todoList)
    );
  };

  @action
  deleteTodo = (id: string) => {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  };
}
