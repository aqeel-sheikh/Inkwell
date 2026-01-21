import type { Request, Response } from "express";
import { selectCheckUsername, updateUser } from "@/db/queries";
import { UserSchema, type UserDto, type User } from "@/types/users.schema";

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

export const updateUserProfile = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userData = req.body as UserDto;
  const userId = (req as any).userId;
  const currentUsername = (req as any).username;

  const result = UserSchema.safeParse(userData);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
    });
    return res.status(400).json(fieldErrors);
  }

  if (userData.id !== userId) {
    return res
      .status(403)
      .json({ message: "You are not allowed to modify this resource" });
  }

  try {
    const username = userData.username;
    if (!username)
      return res.status(404).json({ message: "Please provide a username" });

    if (username !== currentUsername) {
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return res.status(400).json({
          message: "Username can contain only letters, numbers and _",
        });
      }
      const exists = await selectCheckUsername(username);
      if (exists)
        return res
          .status(409)
          .json({ exists, message: "Username already exists!" });
    }
  } catch (err) {
    console.error("Couldn't check username: ", err);
    return res
      .status(500)
      .json({ message: "Something went wrong! Failed to check username" });
  }

  try {
    const user = await updateUser(userData as User, userData.id);
    return res.status(201).json({ message: "Profile Updated", data: user });
  } catch (err) {
    console.error("Couldn't update user profile", err);
    return res
      .status(500)
      .json({ message: "Something went wrong! Failed to update profile" });
  }
};
