export type Task = {
  id: number;
  title: string;
  notes: string;
  date: Date;
  time: Date;
  categoryId: number;
  createdAt?: Date;
  category?: Category;
  isDone?: boolean;
};

export type CreateTaskBody = {
  title: string;
  notes: string;
  id?: number;
  category: number;
  dateTime: Date;
};

export type Category = {
  id?: number;
  name: string;
  icon: string;
  _count?: {
    tasks: number;
  };
};

export type UserData = {
  fullname?: string;
  email: string;
  password: string;
  image?: string;
};
