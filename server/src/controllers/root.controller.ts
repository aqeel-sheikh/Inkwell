import type { Request, Response } from "express";

export const rootController = (req: Request, res: Response) => {
  res.status(200).send("<h1>Inkwell API is running<h1>");
};
