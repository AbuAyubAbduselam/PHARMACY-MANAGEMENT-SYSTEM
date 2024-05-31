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
  authorizeOwner,
  authorizeUser,
  checkForTestUser,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", authorizeOwner, getUsers);
router.get("/admin/app-stats/:id", authorizeUser, getSingleUser);
router.patch("/admin/app-stats/:id", authorizeOwner, editUser);
router.delete("/admin/app-stats/:id", authorizeOwner, deleteUser);
router.post(
  "/admin/app-stats",
  validateRegisterInput,
  authorizeOwner,
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
