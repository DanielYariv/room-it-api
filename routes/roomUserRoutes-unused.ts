// import { Router, Request, Response } from "express";

// import { validateId, handleError } from "../middleware/validators";

// import Room from "../models/room";

// const router = Router();

// //POST /api/roomsUsers/:id/users - add user to a room
// router.post("/:id/users", validateId, async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { username } = req.body;

//   try {
//     const room = await Room.findById(id);
//     if (!room) {
//       return res.status(404).json({ message: "Room not found" });
//     }

//     if (!room.employees.includes(username)) {
//       room.employees.push(username);
//       await room.save();
//       res.json(room);
//     } else {
//       res.status(400).json({ message: "User already in room" });
//     }
//   } catch (err) {
//     handleError(res, err);
//   }
// });

// // DELETE /api/roomsUsers/:id/users/:username - Remove user from a room
// router.delete(
//   "/:id/users/:username",
//   validateId,
//   async (req: Request, res: Response) => {
//     const { id, username } = req.params;
//     try {
//       const room = await Room.findById(id);
//       if (!room) {
//         return res.status(404).json({ message: "Room not found" });
//       }

//       const userIndex = room.employees.indexOf(username);
//       if (userIndex !== -1) {
//         room.employees.splice(userIndex, 1);
//         await room.save();
//         res.json(room);
//       } else {
//         res.status(404).json({ message: "User not found in room" });
//       }
//     } catch (err) {
//       handleError(res, err);
//     }
//   }
// );

// // UPDATE /api/roomsUsers/:id/users - Update users in a room
// router.put("/:id/users", validateId, async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { users } = req.body;

//   try {
//     const room = await Room.findById(id);
//     if (!room) {
//       return res.status(404).json({ message: "Room not found" });
//     }

//     room.employees = users;
//     await room.save();
//     res.json(room);
//   } catch (err) {
//     handleError(res, err);
//   }
// });

// export default router;
