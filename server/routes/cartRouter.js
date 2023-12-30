import { Router } from "express";
//middlewares
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware.js";
//controllers
import {
  addDeviceToCart,
  getCart,
  getCartAmount,
} from "../controllers/cartController.js";

export const cartRouter = new Router();

cartRouter.post("/add_device_to_cart", checkAuthMiddleware, addDeviceToCart);
cartRouter.get("/get_cart", checkAuthMiddleware, getCart);
cartRouter.get("/get_cart_amount", checkAuthMiddleware, getCartAmount);
