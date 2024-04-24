import { Request, Response } from "express";
import { HttpError } from "../middlewares/HttpError";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/UserService";

export async function getUserByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await getUserById(parseInt(id, 10));
    if (!user) {
      throw new HttpError("User not found.", 404);
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("[ERROR] getUserByIdHandler()");
    throw error;
  }
}

export async function getAllUsersHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("[ERROR] getAllUsersHandler()");
    throw error;
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedUser = await updateUser(parseInt(id, 10), newData);
    if (!updatedUser) {
      throw new HttpError("User not found.", 404);
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("[ERROR] updateUserHandler()");
    throw error;
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(parseInt(id, 10));
    if (!deletedUser) {
      throw new HttpError("User not found.", 404);
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("[ERROR] deleteUserHandlerr()");
    throw error;
  }
}
