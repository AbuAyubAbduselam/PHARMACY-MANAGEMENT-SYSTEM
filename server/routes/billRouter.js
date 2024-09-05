import { Router } from "express";
import {
  validateBillInput,
  validateIdParam,
  validateBillIdParam,
} from "../middleware/validationMiddlware.js";
const router = Router();
import {
  getAllBills,
  createBill,
  getSingleBill,
  updateBill,
  deleteBills,
  showStats,
} from "../controller/billsController.js";
import {
  authorizeAdmin,
  authorizeUser,
  checkForTestUser,
} from "../middleware/authMiddleware.js";

router.get("/", checkForTestUser, getAllBills);

router.post(
  "/",
  checkForTestUser,
  authorizeAdmin,
  validateBillInput,
  createBill
);

router.get("/stats", checkForTestUser, authorizeUser, showStats);

router
  .route("/:id")
  .get(validateBillIdParam, getSingleBill)
  .patch(
    checkForTestUser,
    validateBillIdParam,
    validateBillInput,
    authorizeUser,
    updateBill
  )
  .delete(checkForTestUser, validateBillIdParam, authorizeUser, deleteBills);

export default router;
