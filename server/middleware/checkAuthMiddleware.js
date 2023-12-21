import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

import { ApiError } from "../error/ApiError.js";

configDotenv();

export const checkAuthMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") next();

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(ApiError.unauthorized("Not authorized"));
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (decodedToken) {
      req.user = decodedToken;
    } else {
      return next(ApiError.forbidden("Not authorized"));
    }

    next();
  } catch (error) {
    return next(ApiError.unauthorized(error.message));
  }
};
