import mongoose, { Schema, Document } from "mongoose";

export interface INode extends Document {
  name: string;
  parentId: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const NodeSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Node",
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model<INode>("Node", NodeSchema);
