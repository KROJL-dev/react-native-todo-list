import { action, makeAutoObservable, observable } from 'mobx';
import { ITodo } from '../models/todo';
import { RootStore } from './store';

export class TodoStore {
  rootStore: RootStore;

  @observable todoList: ITodo[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  addTodo = (todo: ITodo) => {
    this.todoList = [...this.todoList, { ...todo }];
  };

  @action
  deleteTodo = (id:string) => {
    this.todoList.filter(todo=> todo.id !== id )
  };
}
 
