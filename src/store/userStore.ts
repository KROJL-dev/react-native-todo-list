import { makeAutoObservable, action, observable } from 'mobx';
import { RootStore } from './store';

import { IUser } from '../models/user';

import _ from 'lodash';

export class UserStore {
  rootStore: RootStore;

  @observable users: IUser[] = [{ firstName: 'den', lastName: 'kek' }];
  @observable isUser?: boolean;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  login = async (firstName: string, lastName: string) => {
    if (this.checkUser(firstName, lastName)) {
      this.isUser = true
    }
    else{
      this.isUser = false
      setTimeout(()=>{this.isUser = undefined}, 4000)
    }
  };
  @action
  registration = (firstName: string, lastName: string) => {
    this.users = [...this.users, { firstName, lastName }];
  };

  @action
  checkUser = (firstName: string, lastName: string) => {
    let newUsers = _.cloneDeep(this.users);
    let loginSucces = false;
    newUsers.map((user) => {
      if (
        user.firstName === firstName.toLocaleLowerCase() &&
        user.lastName === lastName.toLocaleLowerCase()
      ) {
        loginSucces = true;
        return;
        console.log('return ');
      }
      console.log(user, 'user');
    });
    return loginSucces;
  };
}
