import mongoose from "mongoose";
import { ROLE } from "../utils/constant.js";

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
  },
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  phone: {
    type: Number,
    default: "0909",
  },
  role: {
    type: String,
    enum: Object.values(ROLE),
    default: ROLE.USER,
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Users", UserSchema);
