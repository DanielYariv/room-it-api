import { Request, Response } from "express";
import Room from "../models/room";
import { handleError } from "../middleware/validators";

const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    handleError(res, err);
  }
};

const getRoomByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id);
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    handleError(res, err);
  }
};

const createRoom = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const newRoom = new Room(data);
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    handleError(res, err);
  }
};

const updateRoom = async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;
  console.log(req.params);
  try {
    const updateOptions = { new: true, runValidators: true }; // Ensure the new document is returned and not the old one and ensure schema's validation rules are run
    let updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: data },
      updateOptions
    );

    if (updatedRoom) {
      res.json(updatedRoom);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    handleError(res, err);
  }
};

const deleteRoom = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (deletedRoom) {
      res.json({ message: "Room deleted" });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    handleError(res, err);
  }
};
export default {
  getAllRooms,
  getRoomByID,
  createRoom,
  updateRoom,
  deleteRoom,
};
