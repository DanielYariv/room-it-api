import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

// Middleware to validate ID
export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next();
};

// Middleware function to handle errors
export const handleError = (res: Response, err: unknown) => {
  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Unknown error" });
  }
};
