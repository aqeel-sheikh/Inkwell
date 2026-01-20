import type { Request, Response } from "express";
import { selectCheckUsername } from "@/db/queries";

export const checkUsername = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const username = (req.query.username as string).toLowerCase();

  if (!username)
    return res.status(404).json({ message: "Please provide a username" });

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return res
      .status(400)
      .json({ message: "Username can contain only letters, numbers and _" });
  }

  try {
    const exists = await selectCheckUsername(username);
    if (exists) {
      return res
        .status(409)
        .json({ exists, message: "Username already exists!" });
    } else {
      return res.status(200).json({ exists });
    }
  } catch (err) {
    console.error("Couldn't check username: ", err);
    return res
      .status(500)
      .json({ message: "Something went wrong! Failed to check username" });
  }
};
