import { Error } from "sequelize";

export class ApiError extends Error {
  constructor(status, message) {
    super();
    this.message = message;
    this.status = status;
  }

  //client errors
  static badRequest(message) {
    return new ApiError(400, message);
  }

  static unauthorized(message) {
    return new ApiError(401, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }
}
