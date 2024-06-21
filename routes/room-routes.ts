import { Router } from "express";
import { validateId } from "../middleware/validators";
import roomController from "../controllers/roomController";
import userController from "../controllers/userController";

const router = Router();

// Room routes

// GET /api/room - Get all rooms
router.get("/", roomController.getAllRooms);

// GET /api/room/:id - Get room by ID
router.get("/:id", validateId, roomController.getRoomByID);

// POST /api/room - Create a new room
router.post("/", roomController.createRoom);

// PATCH /api/room/:id - Update room
router.patch("/:id", validateId, roomController.updateRoom);

// DELETE /api/room/:id - Delete room by ID
router.delete("/:id", validateId, roomController.deleteRoom);

// User within rooms routes

//POST /api/room/:id/users - add user to a room
router.post("/:id/users", validateId, userController.addUser);

// DELETE /api/room/:id/users/:username - Remove user from a room
router.delete("/:id/users/:username", validateId, userController.deleteUser);

// PATCH /api/room/:id/users - Update users in a room
router.patch("/:id/users", validateId, userController.updateUsers);

//  GET /api/export - Export data to Excel (Functionality to be implemented)
// router.get("/export", async (req: Request, res: Response) => {
//   try {
//     const employees = await Employee.find();
//     const rooms = await Room.find().populate("occupiedBy");
//     // Here you can use a library like SheetJS to convert data to Excel format
//     // and send it as a downloadable file.
//     res.send("Export functionality to be implemented");
//   } catch (err) {
//     handleError(res, err);
//   }
// });

export default router;
