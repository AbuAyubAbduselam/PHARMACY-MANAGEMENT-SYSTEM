import { Router } from "express";
import {
  validateDrugInput,
  validateIdParam,
} from "../middleware/validationMiddlware.js";
const router = Router();
import {
  getExpiredDrugs,
  getAllDrugs,
  createDrug,
  getSingleDrug,
  updateDrug,
  deleteDrug,
} from "../controller/drugsController.js";
import {
  authorizeAdmin,
  checkForTestUser,
} from "../middleware/authMiddleware.js";

router.get("/", getAllDrugs);

router.post(
  "/",
  checkForTestUser,
  authorizeAdmin,
  validateDrugInput,
  createDrug
);

router.route("/expired-drugs").get(checkForTestUser, getExpiredDrugs);

router
  .route("/:id")
  .get(validateIdParam, getSingleDrug)
  .patch(
    checkForTestUser,
    validateIdParam,
    authorizeAdmin,
    validateDrugInput,
    updateDrug
  )
  .delete(checkForTestUser, validateIdParam, deleteDrug);

export default router;
