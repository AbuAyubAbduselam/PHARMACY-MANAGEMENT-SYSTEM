import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "665444905b50510f3255a969";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizeAdmin = (req, res, next) => {
  const isUser = req.user.role === "user";

  if (!isUser)
    throw new UnauthorizedError("Not authorized to access this route");

  next();
};

export const authorizeUser = (req, res, next) => {
  console.log(req.user.role);

  const isAdmin = req.user.role === "admin";

  if (!isAdmin) {
    throw new UnauthorizedError("Not authorized to access this route");
  }

  next();
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
};
