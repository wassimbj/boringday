export type Task = {
  id: number;
  title: string;
  notes: string;
  date: Date;
  time: Date;
  category: number;
  isDone: boolean;
  createdAt: Date;
};

export type CreateTaskBody = {
  title: string;
  notes: string;
  category: number;
  dateTime: Date;
};

export type Category = {
  id: number;
  name: string;
  icon: string;
};
