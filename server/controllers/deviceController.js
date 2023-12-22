import { ApiError } from "../error/ApiError.js";
import { Device, DeviceInfo } from "../models/models.js";
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
