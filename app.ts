import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import roomsRouter from "./routes/room-routes";
import fileUploadRouter from "./routes/file-upload-routes";
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/RoomIT");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
};

connectDB();

// use room router
app.use("/api/room", roomsRouter);

//use upload file router
app.use("/api/upload", fileUploadRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
