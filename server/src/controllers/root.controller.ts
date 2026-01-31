import type { Request, Response } from "express";

export const rootController = (req: Request, res: Response) => {
  res.status(200).send("<strong>Inkwell API is running</strong>");
};
