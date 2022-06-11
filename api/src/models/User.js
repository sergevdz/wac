import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    username: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model("User", schema);
