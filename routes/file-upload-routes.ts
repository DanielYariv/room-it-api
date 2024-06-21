import { Router } from "express";
import multer from "multer";
import fileUploadController from "../controllers/fileuploadController";
const router = Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/import",
  upload.single("file"),
  fileUploadController.importRoomsFromExcel
);

export default router;
