import { Router } from "express";

//routes
import { userRouter } from "./userRouter.js";
import { deviceRouter } from "./deviceRouter.js";
import { typeRouter } from "./typeRouter.js";
import { barndRouter } from "./brandRouter.js";
import { cartRouter } from "./cartRouter.js";

export const router = new Router();

router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/type", typeRouter);
router.use("/brand", barndRouter);
router.use("/cart", cartRouter);
