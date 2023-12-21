import { Router } from "express";

//middleware
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const deviceRouter = new Router();

//user routes
deviceRouter.get("/get_all_devices");
deviceRouter.get("/get_one_device/:slug");

//admin routes
deviceRouter.post("/create_device", checkRoleMiddleware("ADMIN"));
deviceRouter.put("/change_device/:slug", checkRoleMiddleware("ADMIN"));
deviceRouter.delete("/delete_device/:slug", checkRoleMiddleware("ADMIN"));
