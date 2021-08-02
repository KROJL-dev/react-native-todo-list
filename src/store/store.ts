import remotedev from 'mobx-remotedev';
import { configure, makeAutoObservable, observable } from 'mobx';
import { createContext, useContext } from 'react';

import { TodoStore } from './todoStore';
import { UserStore } from './userStore';

configure({ enforceActions: 'observed' });
@remotedev({ global: true })
export class RootStore {
  @observable todoStore: TodoStore;
  @observable userStore: UserStore;
  constructor() {
    this.todoStore = new TodoStore(this);
    this.userStore = new UserStore(this);
    makeAutoObservable(this);
  }
}

const store = new RootStore();
export const StoreContext = createContext<RootStore>(store);

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);

  if (!store) {
    console.log('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
};

export default store;
