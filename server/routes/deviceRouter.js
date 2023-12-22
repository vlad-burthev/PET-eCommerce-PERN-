import { Router } from "express";

//middleware
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

//controllers
import {
  addRating,
  changeDevice,
  createDevice,
  deleteDevice,
  getAllDevices,
  getOneDevice,
} from "../controllers/deviceController.js";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware.js";

export const deviceRouter = new Router();

//user routes
deviceRouter.get("/get_all_devices", getAllDevices);
deviceRouter.get("/get_one_device/:slug", getOneDevice);

//auth users
deviceRouter.post("/add_rating/:slug", checkAuthMiddleware, addRating);

//admin routes
deviceRouter.post("/create_device", checkRoleMiddleware("ADMIN"), createDevice);
deviceRouter.put(
  "/change_device/:slug",
  checkRoleMiddleware("ADMIN"),
  changeDevice
);
deviceRouter.delete(
  "/delete_device/:slug",
  checkRoleMiddleware("ADMIN"),
  deleteDevice
);
