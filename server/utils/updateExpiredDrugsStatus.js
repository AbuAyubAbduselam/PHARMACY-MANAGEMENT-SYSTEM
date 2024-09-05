import Drug from "../models/drugModels.js";
import { DRUG_STATUS } from "./constant.js";

export function updateExpiredDrugsStatus() {
  // Find and update expired drugs status to 'Expired'
  Drug.updateMany(
    { expiryDate: { $lt: new Date() } },
    { $set: { drugStatus: DRUG_STATUS.EXPIRED } }
  );
}
