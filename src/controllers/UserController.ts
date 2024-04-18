import { Request, Response } from "express";
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
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
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
    console.error("Error getting all users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedUser = await updateUser(parseInt(id, 10), newData);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(parseInt(id, 10));
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
}
