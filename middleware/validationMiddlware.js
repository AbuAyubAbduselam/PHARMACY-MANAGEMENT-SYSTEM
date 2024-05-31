import { body, param, validationResult } from "express-validator";
import moment from "moment";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { DRUG_STATUS, SUPPLIER } from "../utils/constant.js";
import mongoose from "mongoose";
import Drug from "../models/drugModels.js";
import Bill from "../models/billModels.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no drug")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError("Not authorized to access this route");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

const isFutureDate = (value) => {
  const inputDate = moment(value, "YYYY-MM-DD", true);
  const tomorrow = moment().startOf("day"); // Tomorrow's date
  if (!inputDate.isValid()) {
    throw new Error("Invalid date format");
  }
  if (inputDate.isSameOrBefore(tomorrow)) {
    throw new Error("Date must be tomorrow or later");
  }
  return true;
};

export const validateDrugInput = withValidationErrors([
  body("drugName").notEmpty().withMessage("medicine name is required"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be  greater than 0"),
  body("price").notEmpty().withMessage("price is required"),
  body("weight").notEmpty().withMessage("weight is required"),
  body("expiryDate")
    .notEmpty()
    .withMessage("Expiry date is required")
    .custom(isFutureDate),

  body("supplier")
    .isIn(Object.values(SUPPLIER))
    .withMessage("invalid supplier"),
]);

export const validateBillInput = withValidationErrors([
  body("drugId")
    .notEmpty()
    .withMessage("Medicine ID is required")
    .custom(async (value, { req }) => {
      const medicineExists = await Drug.findById(value);
      if (!medicineExists) {
        throw new Error("Medicine not found with this Id");
      }
      if (medicineExists.quantity == 0) {
        throw new Error("Medicine is out of stock");
      }
      return true;
    }),
  body("customerName")
    .notEmpty()
    .withMessage("customer name is required")
    .matches(/^[\p{L}\s]+$/u)
    .withMessage("Customer name must contain only letters"),
  body("patientAddress").notEmpty().withMessage("patient address is required"),
  body("patientPhone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\d{9}$/)
    .withMessage("Phone number must be valid"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer greater than 0"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const drug = await Drug.findById(value);
    if (!drug) throw new NotFoundError(`no drug with id : ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === drug.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("Not authorized to access this route");
  }),
]);
export const validateBillIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const bill = await Bill.findById(value);
    if (!bill) throw new NotFoundError(`no bill with id : ${value}`);
    const isAdmin = req.user.role === "admin";
    if (!isAdmin)
      throw new UnauthorizedError("Not authorized to access this route");
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("The pasword character must be greater than 8"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("phone").notEmpty().withMessage("phone is required"),
]);

export const validateUserLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });

      if (user && user.role !== "user") {
        throw new Error("login with admin route");
      }
    }),
  body("password").notEmpty().withMessage("password is required"),
]);
export const validateAdminLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });

      if (user && user.role == "user") {
        throw new Error("you are not authorized to access this route ");
      }
    }),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("phone").notEmpty().withMessage("phone is required"),
]);
