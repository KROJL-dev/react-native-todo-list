import { makeAutoObservable, action, observable } from 'mobx';
import { RootStore } from './store';

import { IUser } from '../models/user';

import _ from 'lodash';

export class UserStore {
  rootStore: RootStore;

  @observable users: IUser[] = [{ firstName: 'Den', lastName: 'Kek' }];
  @observable isUser?: boolean;
  constructor(rootStore: RootStore) {
    //переделать на локалСторэйдж

    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  checkUser = async (firstName: string, lastName: string) => {
    console.log('checkUser', lastName, firstName);
    let newUsers = _.cloneDeep(this.users);
    newUsers.map((user) => {
      if(user.firstName === firstName && user.lastName === lastName){
        this.isUser = true
        return
      }
    });
    this.isUser = false 
    setTimeout(()=>{this.isUser = undefined}, 4000)
  };
  @action
  registration = (firstName: string, lastName: string) => {
    this.users = [...this.users, { firstName, lastName }];
  };
}
