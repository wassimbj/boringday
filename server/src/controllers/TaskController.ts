import { Request, Response } from "express";
import DB from "../db";
import { addDays, startOfWeek } from "date-fns";

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
  public async getTasksByDate(req: Request, res: Response) {
    try {
      // console.log(req.body)

      const { date } = req.params;

      const tasks = await DB.task.findMany({
        where: { date: new Date(date) },
        include: {
          category: {
            select: { icon: true, name: true },
          },
        },
      });

      return res.status(200).json(tasks);
    } catch (err) {
      console.log(err);
      return res.status(500).json("ERROR!");
    }
  }

  // get tasks by category
  public async getTasksByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;
      console.log(category);
      const tasks = await DB.task.findMany({
        where: { categoryId: Number(category) },
      });

      return res.status(200).json(tasks);
    } catch (err) {
      console.log(err);
      return res.status(500).json("ERROR!");
    }
  }

  // get number of tasks of given week
  public async getNumberOfTasksOfGivenWeek(req: Request, res: Response) {
    try {
      const { date } = req.params; // start of the week 1-31
      const weekDate = startOfWeek(new Date(date), { weekStartsOn: 1 });
      const tasks = await DB.task.groupBy({
        by: ["date"],
        where: { date: { gte: weekDate, lte: addDays(weekDate, 6) } },
        _count: {
          id: true,
        },
      });

      return res.status(200).json(tasks);
    } catch (err) {
      console.log(err);
      return res.status(500).json("ERROR!");
    }
  }
}

export default new TaskController();
