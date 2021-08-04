import { action, makeAutoObservable, observable } from 'mobx';
import { ITodo, Categories } from '../models/todo';
import { RootStore } from './store';

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
    makeAutoObservable(this);
  }

  @action
  addTodo = ({
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
  };

  @action
  deleteTodo = (id: string) => {
    console.log('todoDelete');
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  };
}
