import { Request, Response } from "express";
import * as XLSX from "xlsx";
import Room from "../models/room";
import { handleError } from "../middleware/validators";

const importRoomsFromExcel = async (req: Request, res: Response) => {
  if (!req.file) {
    return handleError(res, new Error("No file uploaded"));
  }

  try {
    // Read the Excel file
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!sheetName) {
      return handleError(
        res,
        new Error("No sheets found in the uploaded file")
      );
    }

    if (!sheet.length) {
      return handleError(res, new Error("Uploaded sheet is empty"));
    }

    // Convert to JSON and import into MongoDB
    const rooms = sheet.map((row: any) => ({
      department: row["Department"],
      building: row["Building"],
      buildingType: row["BuildingType"],
      floor: row["Floor"],
      roomNumber: row["RoomNumber"],
      size: row["Size"],
      location: row["Location"],
      capacity: row["Capacity"],
      employees: row["Employees"] ? row["Employees"].split(",") : [],
      documentLink: {
        name: row["DocumentLinkName"],
        link: row["DocumentLinkURL"],
      },
    }));

    await Room.insertMany(rooms);

    res.status(200).json({ message: "Data imported successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(
        res,
        new Error(
          "Failed to process the file. Please ensure it is a valid Excel file."
        )
      );
    }
    handleError(res, error);
  }
};
export default {
  importRoomsFromExcel,
};
