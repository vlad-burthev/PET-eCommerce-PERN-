import { Router } from "express";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import {
  createType,
  deletedType,
  getAllTypes,
  getOneType,
} from "../controllers/typeController.js";

export const typeRouter = new Router();

//user routes
typeRouter.get("/get_all_types", getAllTypes);
typeRouter.get("/get_one_type/:id", getOneType);

//admin routes
typeRouter.post("/create_type", checkRoleMiddleware("ADMIN"), createType);
typeRouter.delete(
  "/delete_type/:id",
  checkRoleMiddleware("ADMIN"),
  deletedType
);
