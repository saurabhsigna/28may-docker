import { Request, Response } from "express";

export const vroomController = (req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("");
      res.status(200).json({ message: "Vroom Vroom!" });
    }, 900);
  });
};

export const vroomSlowController = (req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("");
      res.status(200).json({ message: "Vroom Vroom! SLoW" });
    }, 2222);
  });
};
