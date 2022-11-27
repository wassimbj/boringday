import { NextFunction, Request, Response } from "express";
import DB from "../db";
import bcrypt from "bcryptjs";

class AuthController {
  // authentication
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await DB.user.findFirst({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(404).json({ error: "Invalid password" });
      }
      req.session!.userId = user.id;
      return res.status(200).json("Success");
    } catch (err) {
      return res.status(500).json("Something is wrong");
    }
  }

  // create account
  public async createAccount(req: Request, res: Response) {
    try {
      const { fullname, email, password } = req.body;
      const user = await DB.user.findFirst({ where: { email } });
      if (!user) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await DB.user.create({
          data: {
            email,
            fullname,
            password: hashedPassword,
          },
          select: { id: true },
        });
        req.session!.userId = newUser.id;
      }
      return res.status(200).json("Success");
    } catch (err) {
      console.log(err);
      return res.status(500).json("Something is wrong");
    }
  }

  // update login info (email, password)
  public async updateLoginInfo(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const dataToUpdate: { email: string; password?: string } = { email };
      if (password) {
        dataToUpdate.password = hashedPassword;
      }

      const user = await DB.user.update({
        where: { id: req.session!.userId },
        data: dataToUpdate,
      });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json("Something is wrong");
    }
  }

  // get logged in user
  public async getLoggedInUser(req: Request, res: Response) {
    try {
      const user = await DB.user.findFirst({
        where: { id: req.session!.userId },
        select: {
          id: true,
          fullname: true,
        },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ id: user.id, fullname: user.fullname });
    } catch (err) {
      return res.status(500).json("Something is wrong");
    }
  }

  // Make sure user is authenticated
  public isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.session!.userId) {
      return next();
    }
    return res.status(401).json("Not authenticated");
  }

  // make sure user is not authenticated
  public isNotAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!req.session!.userId) {
      return next();
    }
    return res.status(401).json("Already authenticated");
  }

  public async logout(req: Request, res: Response) {
    req.session!.destroy((err: any) => {
      if (err) {
        return res.status(500).json("Something is wrong");
      }
      return res.status(200).json("Success");
    });
  }
}

export default new AuthController();
