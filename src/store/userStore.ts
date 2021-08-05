import AsyncStorage from '@react-native-community/async-storage';

import { makeAutoObservable, action, observable } from 'mobx';

import _ from 'lodash';

import { RootStore } from './store';

import { IUser } from '../models/user';

import generateId from '../utils/generateId';

export class UserStore {
  rootStore: RootStore;

  @observable users: IUser[] = [];
  @observable isUser?: boolean;
  @observable isCanGoHomePage: boolean = false;
  @observable errorMessage: string = '';
  @observable currentUser?: IUser;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    (async () => {
      await this.checkAfterReload();
      let currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser !== null) {
        let newCurrentUser = JSON.parse(currentUser) as unknown as IUser;

        await this.login(newCurrentUser.firstName, newCurrentUser.lastName);
      }
    })();

    makeAutoObservable(this);
  }

  @action
  logout = async () => {
    if (this.currentUser !== undefined) {
      this.isUser = undefined;
      this.rootStore.todoStore.todoList = [];
      this.isCanGoHomePage = false;

      AsyncStorage.removeItem('currentUser');
    }
  };

  @action
  login = async (firstName: string, lastName: string) => {
    this.isUser = this.checkUser(firstName, lastName);
    if (this.isUser) {
      this.isCanGoHomePage = true;

      AsyncStorage.removeItem('currentUser');
      AsyncStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    } else {
      this.errorMessage = 'wrong credetial';

      setTimeout(() => {
        this.isUser = undefined;
      }, 2500);
    }
  };

  @action
  checkAfterReload = async () => {
    const dataFromStorage = await AsyncStorage.getItem('users');
    if (dataFromStorage !== null) {
      this.users = JSON.parse(dataFromStorage) as unknown as IUser[];
    }
  };
  @action
  registration = async (firstName: string, lastName: string) => {
    if (!this.checkUser(firstName, lastName)) {
      this.currentUser = { firstName, lastName, userId: generateId() };
      this.users = [...this.users, this.currentUser];
      this.isUser = true;
      this.isCanGoHomePage = true;

      AsyncStorage.removeItem('currentUser');
      AsyncStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      AsyncStorage.setItem('users', JSON.stringify(this.users));

      return true;
    } else {
      this.isUser = false;
      this.errorMessage = 'user allready exist';

      setTimeout(() => {
        this.isUser = undefined;
      }, 2500);

      return false;
    }
  };

  @action
  checkUser = (firstName: string, lastName: string) => {
    let newUsers = _.cloneDeep(this.users);
    let isUserExist = false;

    newUsers.map((user) => {
      if (
        user.firstName.toLocaleLowerCase() === firstName.toLocaleLowerCase() &&
        user.lastName.toLocaleLowerCase() === lastName.toLocaleLowerCase()
      ) {
        isUserExist = true;
        this.currentUser = user;

        return;
      }
    });

    return isUserExist;
  };
}
