import { configDotenv } from "dotenv";

import { ApiError } from "../error/ApiError.js";
import jwt from "jsonwebtoken";

configDotenv();

export const checkRoleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") next();

    try {
      const existToken = req.headers.authorization;
      if (!existToken) {
        return next(ApiError.forbidden("Unauthorized"));
      }

      const token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      if (decodedToken.role !== role) {
        return next(ApiError.forbidden("Not enough rights"));
      }

      req.user = decodedToken;
      next();
    } catch (error) {
      return next(ApiError.unauthorized(error.message));
    }
  };
};
