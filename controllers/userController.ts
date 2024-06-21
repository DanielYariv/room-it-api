import { Request, Response } from "express";
import Room from "../models/room";
import { handleError } from "../middleware/validators";

const addUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (!room.employees.includes(username)) {
      room.employees.push(username);
      await room.save();
      res.json(room);
    } else {
      res.status(400).json({ message: "User already in room" });
    }
  } catch (err) {
    handleError(res, err);
  }
};

// DELETE /api/roomsUsers/:id/users/:username - Remove user from a room
const deleteUser = async (req: Request, res: Response) => {
  const { id, username } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const userIndex = room.employees.indexOf(username);
    if (userIndex !== -1) {
      room.employees.splice(userIndex, 1);
      await room.save();
      res.json(room);
    } else {
      res.status(404).json({ message: "User not found in room" });
    }
  } catch (err) {
    handleError(res, err);
  }
};

const updateUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { users } = req.body;
  console.log(req.body);
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.employees = users;
    await room.save();
    res.json(room);
  } catch (err) {
    handleError(res, err);
  }
};

export default {
  addUser,
  deleteUser,
  updateUsers,
};
