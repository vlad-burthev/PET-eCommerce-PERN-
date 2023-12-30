import { Sequelize } from "sequelize";
import { ApiError } from "../error/ApiError.js";
import {
  CartDevice,
  Device,
  DeviceInfo,
  DeviceRating,
  UserCart,
} from "../models/models.js";

export const addDeviceToCart = async (req, res, next) => {
  try {
    const { deviceId, amount = 1 } = req.body;
    const cart = await UserCart.findOne({ where: { userId: req.user.id } });

    if (!cart) {
      return next(ApiError.badRequest("not found cart"));
    }

    // Проверяем, есть ли уже устройство с таким deviceId в корзине
    const existingDevice = await CartDevice.findOne({
      where: { userCartId: cart.id, deviceId },
    });

    if (existingDevice) {
      // Если устройство уже есть в корзине, увеличиваем количество
      existingDevice.amount += amount;
      await existingDevice.save();
    } else {
      // Если устройства нет, создаем новую запись
      await CartDevice.create({
        userCartId: cart.id,
        deviceId,
        amount,
      });
    }

    return res.status(200).json("device added to cart");
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getCart = async (req, res, next) => {
  try {
    const userCarts = await UserCart.findOne({
      where: { userId: req.user.id },
      include: [{ model: CartDevice, as: "devices" }],
    });

    const deviceIds = userCarts.devices.map((device) => device.deviceId);

    const devices = await Device.findAll({
      where: { id: deviceIds },
      include: [
        { model: DeviceInfo, as: "info" },
        { model: DeviceRating, as: "rating" },
      ],
      distinct: true,
    });

    const amountMap = userCarts.devices.reduce((acc, { deviceId, amount }) => {
      acc[deviceId] = (acc[deviceId] || 0) + amount;
      return acc;
    }, {});

    const result = devices.map((device) => {
      const {
        id,
        name,
        slug,
        image,
        price,
        sale,
        description,
        typeId,
        brandId,
        info,
        rating,
      } = device;
      return {
        id,
        name,
        slug,
        image,
        price,
        sale,
        description,
        typeId,
        brandId,
        info,
        rating,
        amount: amountMap[id] || 0,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getCartAmount = async (req, res, next) => {
  try {
    const userCarts = await UserCart.findOne({
      where: { userId: req.user.id },
      include: [{ model: CartDevice, as: "devices" }],
    });

    const amount = userCarts.devices.reduce(
      (acc, curr) => curr.amount + acc,
      0
    );

    return res.json(amount);
  } catch (error) {}
};
