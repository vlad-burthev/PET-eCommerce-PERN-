import { ApiError } from "../error/ApiError.js";
import {
  Device,
  DeviceInfo,
  DeviceRating,
  Type,
  Brand,
  User,
} from "../models/models.js";
import { v4 as uuidv4 } from "uuid";

import sharp from "sharp";

import * as path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

//path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const convertSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
};

export const createDevice = async (req, res, next) => {
  try {
    const { name, typeId, brandId, price, sale, info, description } = req.body;
    const { image } = req.files;

    const existingDevice = await Device.findOne({ where: { name } });
    if (existingDevice) {
      return next(ApiError.badRequest("Device already exists."));
    }

    let fileName = uuidv4() + ".webp";
    sharp(image.data)
      .webp({ quality: 70 })
      .toFile(path.join(__dirname, "..", "static", fileName), (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

    let slug = convertSlug(name);

    const createdDevice = await Device.create({
      slug,
      name,
      price,
      sale,
      brandId,
      typeId,
      image: fileName,
      description,
    });

    if (info) {
      const parsedInfo = JSON.parse(info);
      parsedInfo.forEach((element) => {
        DeviceInfo.create({
          title: element.title,
          description: element.description,
          deviceId: createdDevice.id,
        });
      });
    }

    return res.status(200).json({ createdDevice });
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getOneDevice = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const existingDevice = await Device.findOne({
      where: { slug },
      include: [
        { model: DeviceRating, as: "rating" },
        { model: DeviceInfo, as: "info" },
        { model: Brand, as: "brand", attributes: ["name"] },
        { model: Type, as: "type", attributes: ["name"] },
      ],
    });

    if (!existingDevice) {
      return next(ApiError.notFound("Device not found"));
    }

    return res.status(200).json(existingDevice);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const deleteDevice = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const existingDevice = await Device.findOne({
      where: { slug },
    });
    if (!existingDevice) {
      return next(ApiError.notFound("Device not found"));
    }

    await existingDevice.destroy();

    return res.status(200).json("Device successfully deleted.");
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const changeDevice = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name, price, description } = req.body;

    const existingDevice = await Device.findOne({
      where: { slug },
    });

    if (!existingDevice) {
      return next(ApiError.notFound("Device not found"));
    }

    existingDevice.name = name || existingDevice.name;
    existingDevice.price = price || existingDevice.price;
    existingDevice.description = description || existingDevice.description;
    if (name) {
      const newSlug = convertSlug(name);
      existingDevice.slug = newSlug || existingDevice.slug;
    }

    await existingDevice.save();

    return res.status(200).json(existingDevice);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getAllDevices = async (req, res, next) => {
  try {
    const { limit = 12, page = 1, typeId, brandId } = req.query;

    let offset = page * limit - limit;

    let devices;

    if (!typeId && !brandId) {
      devices = await Device.findAndCountAll({
        limit,
        offset,
        include: [
          { model: DeviceRating, as: "rating" },
          { model: DeviceInfo, as: "info" },
          { model: Brand, as: "brand", attributes: ["name"] },
          { model: Type, as: "type", attributes: ["name"] },
        ],
      });
    }

    if (typeId && !brandId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
        include: [
          { model: DeviceRating, as: "rating" },
          { model: DeviceInfo, as: "info" },
          { model: Brand, as: "brand", attributes: ["name"] },
          { model: Type, as: "type", attributes: ["name"] },
        ],
      });
    }

    if (!typeId && brandId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
        include: [
          { model: DeviceRating, as: "rating" },
          { model: DeviceInfo, as: "info" },
          { model: Brand, as: "brand", attributes: ["name"] },
          { model: Type, as: "type", attributes: ["name"] },
        ],
      });
    }

    if (typeId && brandId) {
      devices = await Device.findAndCountAll({
        where: { brandId, brandId },
        limit,
        offset,
        include: [
          { model: DeviceRating, as: "rating" },
          { model: DeviceInfo, as: "info" },
          { model: Brand, as: "brand", attributes: ["name"] },
          { model: Type, as: "type", attributes: ["name"] },
        ],
      });
    }

    return res.status(200).json(devices);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const addRating = async (req, res, next) => {
  try {
    const { rating } = req.body;
    const { slug } = req.params;
    const userId = req.user.id;
    const existingUser = await User.findOne({ where: { id: userId } });
    if (!existingUser) {
      return next(ApiError.badRequest("User does not exist"));
    }

    const existingDevice = await Device.findOne({ where: { slug: slug } });

    if (!existingDevice) {
      return next(ApiError.badRequest("Device does not exist"));
    }

    const [existingRating, created] = await DeviceRating.findOrCreate({
      where: { userId, slug },
      defaults: { rating },
    });

    if (!created) {
      await existingRating.update({ rating });
      return res.status(200).json(existingRating);
    } else {
      return res.status(201).json(existingRating);
    }
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
