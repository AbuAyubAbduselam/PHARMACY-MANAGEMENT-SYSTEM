import Drug from "../models/drugModels.js";
import Bill from "../models/billModels.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";
import { Insufficient } from "../errors/customErrors.js";

//===============GET ALL BILLS==================//
export const getAllBills = async (req, res) => {
  const { search, drugStatus, supplier, sort } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.$or = [
      { drugName: { $regex: search, $options: "i" } },
      { drugId: { $regex: search, $options: "i" } },
      { customerName: { $regex: search, $options: "i" } },
    ];
  }

  if (supplier && supplier !== "all") {
    queryObject.supplier = supplier;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "customerName",
    "z-a": "-customerName",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const bills = await Bill.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalBills = await Bill.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalBills / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalBills, numOfPages, currentPage: page, bills });
};

//==============CREATE BILL====================//

export const createBill = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const {
    drugId,
    quantity,
    customerName,
    patientAddress,
    patientPhone,
    createdBy,
  } = req.body;

  const drug = await Drug.findById(drugId);

  if (drug.quantity < quantity) {
    throw new Insufficient("Insufficient amount of drug");
  }

  const unitPrice = drug.price;
  drug.quantity -= quantity;
  const weight = drug.weight;
  const drugName = drug.drugName;

  await drug.save();
  console.log(unitPrice);

  const totalPrice = drug.price * quantity;

  const billDetail = {
    totalPrice,
    drugId,
    quantity,
    customerName,
    patientPhone,
    patientAddress,
    weight,
    createdBy,
    drugName,
    unitPrice,
  };

  const bill = await Bill.create(billDetail);
  res.status(StatusCodes.CREATED).json({ bill });
};

//=============GET SINGLE BILL================
export const getSingleBill = async (req, res) => {
  const { id } = req.params;

  const bill = await Bill.findOne({ _id: id });

  res.status(StatusCodes.OK).json({ bill });
};

//---------------UPDATE BILLS
export const updateBill = async (req, res) => {
  const { id } = req.params;
  const { drugId, quantity, customerName, description } = req.body;

  const drug = await Drug.findById(drugId);
  const bill = await Bill.findById(id);

  console.log(drug.quantity);

  let allDrugQuantity = drug.quantity + bill.quantity;

  if (allDrugQuantity < quantity) {
    throw new Insufficient("Insufficient amount of drug");
  }
  if (quantity > bill.quantity) {
    const addedQuantity = quantity - bill.quantity;
    drug.quantity -= addedQuantity;
    await drug.save();
  }
  if (quantity < bill.quantity) {
    const leftQuantity = bill.quantity - quantity;
    drug.quantity += leftQuantity;
    await drug.save();
  }

  const unitPrice = drug.price;
  const weight = drug.weight;
  const drugName = drug.drugName;

  const totalPrice = drug.price * quantity;

  const billDetail = {
    totalPrice,
    drugId,
    quantity,
    customerName,
    description,
    weight,

    drugName,
    unitPrice,
  };
  const updatedBill = await Bill.findByIdAndUpdate(id, billDetail, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "bill is modified" });
};

//-----------------DELETE BILLS
export const deleteBills = async (req, res) => {
  const { id } = req.params;
  const removedBill = await Bill.findByIdAndDelete(id);

  res
    .status(StatusCodes.OK)
    .json({ msg: "bill is deleted", bill: removedBill });
};

import dayjs from "dayjs";

export const showStats = async (req, res) => {
  try {
    const today = dayjs().format("DD MMM YYYY");

    const totalBills = await Bill.countDocuments([
      { $match: { createdAt: { $gte: today } } },
    ]);

    let dailySales = await Bill.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          total: { $sum: "$totalPrice" },
        },
      },

      { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } },
      { $limit: 30 },
    ]);

    dailySales = dailySales
      .map((item) => {
        const {
          _id: { year, month, day },
          total,
        } = item;

        const date = dayjs()
          .date(day)
          .month(month - 1)
          .year(year)
          .format("DD MMM YYYY");
        return { date, total };
      })
      .reverse();

    const totalSales = await Bill.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);
    let totalBirr = totalSales[0].total;

    console.log(totalSales);

    res.status(StatusCodes.OK).json({ totalBills, totalBirr, dailySales });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
