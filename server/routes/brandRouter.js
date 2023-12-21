import { Router } from "express";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const barndRouter = new Router();

//user routes
barndRouter.get("/get_all_brands");
barndRouter.get("/get_one_brand");

//admin routes
barndRouter.post("/create_brand", checkRoleMiddleware("ADMIN"));
barndRouter.delete("/delete_brand/:id", checkRoleMiddleware("ADMIN"));
