import { Request, Response } from "express";
import DB from "../db";

type CategoryBody = {
  id: number;
  name: string;
  icon: string;
};
class CategoryController {
  public async create(req: Request, res: Response) {
    try {
      const { name, icon }: CategoryBody = req.body;

      await DB.category.create({
        data: {
          name,
          icon,
        },
      });

      return res.status(200).json("success");
    } catch (err) {
      console.log(err);
      return res.status(500).json("ERROR!");
    }
  }

  public async getCategories(req: Request, res: Response) {
    try {
      const categories = await DB.category.findMany({
        select: {
          icon: true,
          name: true,
          _count: {
            select: {
              Tasks: true,
            },
          },
        },
      });

      return res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      return res.status(500).json("ERROR!");
    }
  }

  //   edit category
  public async update(req: Request, res: Response) {
    try {
      const { id, name, icon }: CategoryBody = req.body;

      // user can't update the default category
      if (id === 1) {
        return res.status(400).json("bad request");
      }
      await DB.category.update({
        where: { id },
        data: {
          name,
          icon,
        },
      });

      return res.status(200).json("success");
    } catch (err) {
      console.log(err);
      return res.status(500).json("ERROR!");
    }
  }

  //   delete category
  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // can't delete the default category
      if (Number(id) === 1) {
        return res.status(400).json("bad request");
      }

      await DB.category.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json("success");
    } catch (err) {
      console.log(err);
      return res.status(500).json("ERROR!");
    }
  }
}

export default new CategoryController();
