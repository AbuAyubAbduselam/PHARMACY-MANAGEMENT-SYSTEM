import mongoose, { Schema } from "mongoose";
import { DRUG_STATUS, SUPPLIER } from "../utils/constant.js";

const BillSchema = new mongoose.Schema(
  {
    drugId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
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
    totalPrice: {
      type: Number,
    },
    unitPrice: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    patientAddress: {
      type: String,
    },
    patientPhone: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", BillSchema);
