import { Router } from "express";
import {
  createUser,
  deleteUser,
  editUser,
  getUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
} from "../controller/userController.js";
import {
  validateRegisterInput,
  validateUpdateUserInput,
} from "../middleware/validationMiddlware.js";
import {
  authorizeUser,
  checkForTestUser,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", authorizeUser, getUsers);
router.get("/admin/app-stats/:id", authorizeUser, getSingleUser);
router.patch("/admin/app-stats/:id", authorizeUser, editUser);
router.delete("/admin/app-stats/:id", authorizeUser, deleteUser);
router.post(
  "/admin/app-stats",
  validateRegisterInput,
  authorizeUser,
  createUser
);
router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default router;
