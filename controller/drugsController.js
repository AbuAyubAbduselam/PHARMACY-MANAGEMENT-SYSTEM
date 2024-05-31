import Drug from "../models/drugModels.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";
import { DRUG_STATUS } from "../utils/constant.js";

//===============GET ALL DRUGS==================//
export const getAllDrugs = async (req, res) => {
  const { search, drugStatus, supplier, sort } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.$or = [
      { drugName: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (supplier && supplier !== "all") {
    queryObject.supplier = supplier;
  }

  if (drugStatus && drugStatus !== "all") {
    if (drugStatus === DRUG_STATUS.EXPIRED) {
      queryObject.expiryDate = { $lt: new Date() };
      queryObject.quantity = { $gt: 0 };
    } else if (drugStatus === DRUG_STATUS.OUT_OF_STOCK) {
      queryObject.quantity = { $eq: 0 };
    } else if (drugStatus === DRUG_STATUS.AVAILABLE) {
      queryObject.expiryDate = { $gt: new Date() };
      queryObject.quantity = { $gt: 0 };
    }
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "drugName",
    "z-a": "-drugName",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const drugs = await Drug.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const allDrugs = drugs.map((drug) => {
    let drugStatus = DRUG_STATUS.AVAILABLE;
    const date = new Date();
    if (drug.expiryDate <= date && drug.quantity !== 0)
      drugStatus = DRUG_STATUS.EXPIRED;
    if (drug.quantity <= 0) drugStatus = DRUG_STATUS.OUT_OF_STOCK;

    return {
      drugName: drug.drugName,
      quantity: drug.quantity,
      expiryDate: drug.expiryDate,
      weight: drug.weight,
      price: drug.price,
      supplier: drug.supplier,
      description: drug.description,
      _id: drug._id,
      drugStatus,
    };
  });

  const totalDrugs = await Drug.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalDrugs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalDrugs, numOfPages, currentPage: page, drugs: allDrugs });
};
//===============GET EXPIRED MEDICINE==================//
export const getExpiredDrugs = async (req, res) => {
  const { search, supplier, sort } = req.query;

  const queryObject = {
    expiryDate: { $lt: new Date() },
    quantity: { $gt: 0 },
  };

  if (search) {
    queryObject.$or = [{ drugName: { $regex: search, $options: "i" } }];
  }
  if (supplier && supplier !== "all") {
    queryObject.supplier = supplier;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const drugs = await Drug.find(queryObject).skip(skip).limit(limit);

  const expDrugs = drugs
    .filter((drug) => drug.quantity > 0)
    .map((drug) => ({
      drugName: drug.drugName,
      _id: drug._id,
      drugStatus: DRUG_STATUS.EXPIRED,
      supplier: drug.supplier,
      quantity: drug.quantity,
      weight: drug.weight,
      price: drug.price,
    }));

  const totalDrugs = await Drug.countDocuments(queryObject);
  console.log(totalDrugs);
  const numOfPages = Math.ceil(totalDrugs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalDrugs, numOfPages, currentPage: page, drugs: expDrugs });
};

//==============CREATE DRUG====================//

export const createDrug = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const drug = await Drug.create(req.body);
  res.status(StatusCodes.CREATED).json({ drug });
};

//=============GET SINGLE DRUG================
export const getSingleDrug = async (req, res) => {
  const { id } = req.params;

  const drug = await Drug.findOne({ _id: id });

  res.status(StatusCodes.OK).json({ drug });
};

//---------------UPDATE Drug
export const updateDrug = async (req, res) => {
  const { id } = req.params;
  const updatedDrug = await Drug.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  console.log(updatedDrug);

  res.status(StatusCodes.OK).json({ msg: "drug is modified" });
};

//-----------------DELETE DRUG
export const deleteDrug = async (req, res) => {
  const { id } = req.params;
  const removedDrug = await Drug.findByIdAndDelete(id);

  res
    .status(StatusCodes.OK)
    .json({ msg: "drug is deleted", drug: removedDrug });
};
