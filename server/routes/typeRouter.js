import { Router } from "express";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const typeRouter = new Router();

//user routes
typeRouter.get("/get_all_types");
typeRouter.get("/get_one_type");

//admin routes
typeRouter.post("/create_type", checkRoleMiddleware("ADMIN"));
typeRouter.delete("/delete_type/:id", checkRoleMiddleware("ADMIN"));
