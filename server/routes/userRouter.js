import { Router } from "express";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const userRouter = new Router();

//user routes
userRouter.post("/login");
userRouter.post("/registration");
userRouter.post("/check", checkAuthMiddleware);

//admin routes
userRouter.get("/get_all_users", checkRoleMiddleware("ADMIN"));
userRouter.delete("/delete_user/:id", checkRoleMiddleware("ADMIN"));
