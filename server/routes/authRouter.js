import { Router } from "express";
const router = Router();
import { register, login, logout } from "../controller/authController.js";
import {
  validateAdminLoginInput,
  validateRegisterInput,
  validateUserLoginInput,
} from "../middleware/validationMiddlware.js";
import { authorizeUser } from "../middleware/authMiddleware.js";

router.post("/register", validateRegisterInput, register);
router.post("/login/user", validateUserLoginInput, login);
router.post("/login/test", validateUserLoginInput, login);
router.post("/login/admin", validateAdminLoginInput, login);
router.get("/logout", logout);

export default router;
