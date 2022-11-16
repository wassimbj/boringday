import { Request, Response } from "express";
import DB from "../db";
// TODO: create task
// TODO: update task
// TODO: delete task
// TODO: get date tasks

type CreateBody = {
  title: string;
  notes: string;
  category: number;
  date: Date;
};

class TaskController {
  public async create(req: Request, res: Response) {
    try {
      console.log(req.body)
      
      const { title, notes, category, date }: CreateBody = req.body;

      await DB.task.create({
        data: {
          date: new Date(date),
          notes,
          title,
          categoryId: category,
        },
      });

      return res.status(200).json("success");
    } catch (err) {
      console.log(err);
      return res.status(500).json("ERROR!");
    }
  }
}

export default new TaskController();
