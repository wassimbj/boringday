import { Request, Response } from "express";
import DB from "../db";
// TODO: get date tasks

type TaskBody = {
  id: number;
  title: string;
  notes: string;
  category: number;
  dateTime: Date;
};

class TaskController {
  public async create(req: Request, res: Response) {
    try {
      // console.log(req.body)

      const { title, notes, category, dateTime }: TaskBody = req.body;

      await DB.task.create({
        data: {
          date: new Date(dateTime),
          time: new Date(dateTime),
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

  // update task
  public async update(req: Request, res: Response) {
    try {
      const { id, title, notes, category, dateTime }: TaskBody = req.body;

      await DB.task.update({
        where: { id },
        data: {
          date: new Date(dateTime),
          time: new Date(dateTime),
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

  // delete task
  public async delete(req: Request, res: Response) {
    try {
      // console.log(req.body)

      const { id } = req.params;

      await DB.task.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json("success");
    } catch (err) {
      console.log(err);
      return res.status(500).json("ERROR!");
    }
  }

  // get date tasks
  public async getDateTasks(req: Request, res: Response) {
    try {
      // console.log(req.body)

      const { date } = req.params;

      const tasks = await DB.task.findMany({
        where: { date: new Date(date) },
      });

      return res.status(200).json(tasks);
    } catch (err) {
      console.log(err);
      return res.status(500).json("ERROR!");
    }
  }
}

export default new TaskController();
