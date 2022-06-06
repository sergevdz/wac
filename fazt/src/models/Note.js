import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String
  },
  {
    timestamps: true
  }
);

export default model("Note", schema);
