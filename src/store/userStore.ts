import { makeAutoObservable, action, observable } from 'mobx';
import { RootStore } from './store';

import { IUser } from '../models/user';

import _ from 'lodash';

import AsyncStorage from '@react-native-community/async-storage';

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
  login = async (firstName: string, lastName: string) => {
    console.log('login');
    if (this.checkUser(firstName, lastName)) {
      this.isUser = true;
      this.isCanGoHomePage = true;
      AsyncStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    } else {
      this.errorMessage = 'wrong credetial';
      this.isUser = false;
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
      this.users = [...this.users, { firstName, lastName }];
      AsyncStorage.setItem('users', JSON.stringify(this.users));
      this.isUser = true; // for throw error ()
      this.isCanGoHomePage = true;
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
    console.log(firstName, lastName);
    console.log(newUsers, 'this.users');
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
