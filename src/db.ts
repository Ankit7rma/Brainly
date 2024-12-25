import mongoose, { model, Schema, Types } from "mongoose";

mongoose.connect("mongodb://localhost:27017/brainly_db");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

const LinkSchema = new Schema({
  // 'hash' is a string that represents the shortened or hashed version of a link
  hash: String,

  // 'userId' is a reference to the 'User' collection in the database.
  // It uses Mongoose's ObjectId type for relational data.
  // The 'ref' property specifies the referenced collection name ('User').
  // The 'required' property ensures this field must be provided when creating a document.
  // The 'unique' property enforces that each 'userId' in this collection is unique.
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});
const models = {
  UserModel: model("User", userSchema),
  ContentModel: model("Content", contentSchema),
  LinkModel: model("Link", LinkSchema),
};

export default models;
