import { Router } from "express";
import { validateId } from "../middleware/validators";
import roomController from "../controllers/roomController";
import employeeController from "../controllers/employeeController";

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

//POST /api/room/:id/employees - add user to a room
router.post("/:id/employees", validateId, employeeController.addEmployee);

// DELETE /api/room/:id/employee/:username - Remove user from a room
router.delete(
  "/:id/employee/:username",
  validateId,
  employeeController.deleteEmployee
);

// PATCH /api/room/:id/employees - Update employees in a room
router.patch("/:id/employees", validateId, employeeController.updateEmployee);

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
