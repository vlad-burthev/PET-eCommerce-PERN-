import { configDotenv } from "dotenv";

import { ApiError } from "../error/ApiError.js";

configDotenv();

export const checkRoleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") next();

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return next(ApiError.forbidden("Unauthorized"));
      }

      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      if (decodedToken.role !== role) {
        return next(ApiError.forbidden("Not enough rights"));
      }

      req.user = decodedToken;
      next();
    } catch (error) {
      return next(ApiError.unauthorization(error.message));
    }
  };
};
