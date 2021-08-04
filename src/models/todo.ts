export interface ITodo {
  title: string;
  description: string;
  isComplited: boolean;
  category: string;
  id:string
  createdAt:string
  deadline?:string
}

export enum Categories {
    "home", "work", "study"
}