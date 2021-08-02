export interface ITodo {
  title: string;
  description: string;
  isComplited: string;
  category: Categories;
  id:string
}

enum Categories {
    "home", "work"
}