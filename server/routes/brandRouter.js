import { Router } from "express";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import {
  createBrand,
  deletedBrand,
  getAllBrands,
  getOneBrand,
} from "../controllers/brandController.js";

export const barndRouter = new Router();

//user routes
barndRouter.get("/get_all_brands", getAllBrands);
barndRouter.get("/get_one_brand/:id", getOneBrand);

//admin routes
barndRouter.post("/create_brand", checkRoleMiddleware("ADMIN"), createBrand);
barndRouter.delete(
  "/delete_brand/:id",
  checkRoleMiddleware("ADMIN"),
  deletedBrand
);
