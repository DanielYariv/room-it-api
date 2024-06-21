import { Schema, model, Document, Types } from "mongoose";

export interface IRoom extends Document {
  _id: Types.ObjectId;
  department: string;
  building: string;
  buildingType: string;
  floor: string;
  roomNumber: string;
  size: number;
  location: string;
  capacity: number;
  employees: string[]; // Array of employee usernames
  documentLink: {
    name: string;
    link: string;
  };
  createdAt: Date; //managed by mongoose timestamps
  updatedAt: Date; //managed by mongoose timestamps
  freeSpace: number; // Virtual property
}

const RoomSchema = new Schema<IRoom>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    department: { type: String, required: true },
    building: { type: String, required: true },
    buildingType: { type: String, required: true },
    floor: { type: String, required: true },
    roomNumber: { type: String, required: true },
    size: { type: Number, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    employees: [{ type: String }], // Array of employee usernames and then i get user details from ad
    documentLink: {
      name: String,
      link: String,
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
    toJSON: { virtuals: true }, //ensure that virtual property are included when converting documents to JSON or plain objects.
    toObject: { virtuals: true }, //ensure that virtual property are included when converting documents to JSON or plain objects.
  }
);

// Define a virtual property `freeSpace`
RoomSchema.virtual("freeSpace").get(function (this: IRoom) {
  return this.capacity - this.employees.length;
});

const Room = model<IRoom>("Room", RoomSchema);
export default Room;
