import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Drug from "../models/drugModels.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getUsers = async (req, res) => {
  const users = await User.find({ role: { $ne: "owner" } });
  console.log(users);

  res.status(StatusCodes.OK).json({ users });
};

export const createUser = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  res.status(StatusCodes.OK).json({ user });
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const editUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  console.log(editUser);

  res.status(StatusCodes.OK).json({ msg: "drug is modified" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const removedUser = await User.findByIdAndDelete(id);

  res
    .status(StatusCodes.OK)
    .json({ msg: "drug is deleted", user: removedUser });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
