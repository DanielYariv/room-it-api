import { Request, Response } from "express";
import Room from "../models/room";
import { handleError } from "../middleware/validators";

//add a single user to the employees array if they are not already present
const addEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (!room.employees.includes(username)) {
      await Room.findByIdAndUpdate(
        id,
        { $push: { employees: username } },
        { new: true }
      );
      const updatedRoom = await Room.findById(id);
      res.json(updatedRoom);
    } else {
      res.status(400).json({ message: "User already in room" });
    }
  } catch (err) {
    handleError(res, err);
  }
};

const deleteEmployee = async (req: Request, res: Response) => {
  const { id, username } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.employees.includes(username)) {
      await Room.findByIdAndUpdate(
        id,
        { $pull: { employees: username } },
        { new: true }
      );
      const updatedRoom = await Room.findById(id);
      res.json(updatedRoom);
    } else {
      res.status(404).json({ message: "User not found in room" });
    }
  } catch (err) {
    handleError(res, err);
  }
};

//update the employees array by adding multiple users at once, ensuring no duplicates
const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { users } = req.body;
  console.log(req.body);
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await Room.findByIdAndUpdate(
      id,
      { $addToSet: { employees: { $each: users } } }, //  each employees in the employees array is added to the employees array only if they are not already present
      { new: true }
    );
    const updatedRoom = await Room.findById(id);
    res.json(updatedRoom);
  } catch (err) {
    handleError(res, err);
  }
};

export default {
  addEmployee,
  deleteEmployee,
  updateEmployee,
};
