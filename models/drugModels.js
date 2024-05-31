import mongoose, { Schema } from "mongoose";
import { DRUG_STATUS, SUPPLIER } from "../utils/constant.js";
import { customAlphabet } from "nanoid";

// Define a custom nanoid alphabet with digits
const nanoid = customAlphabet("1234567890", 6);

const DrugSchema = new mongoose.Schema(
  {
    drugId: {
      type: String,
      unique: true,
    },
    drugName: String,
    drugStatus: {
      type: String,
      enum: Object.values(DRUG_STATUS),
      default: DRUG_STATUS.AVAILABLE,
    },
    supplier: {
      type: String,
      enum: Object.values(SUPPLIER),
      default: SUPPLIER.SUPPLIER_1,
    },
    expiryDate: {
      type: Date,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

DrugSchema.pre("save", async function (next) {
  if (this.isNew) {
    // Generate a unique 6-digit ID using nanoid
    this.drugId = nanoid();
  }
  next();
});

export default mongoose.model("Drug", DrugSchema);
