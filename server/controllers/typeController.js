import { ApiError } from "../error/ApiError.js";
import { Type } from "../models/models.js";

export const createType = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingType = await Type.findOne({ where: { name } });

    if (existingType) {
      return next(ApiError.badRequest("Type already exists."));
    }

    await Type.create({ name });

    return res.status(200).json("Type successfully created");
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getAllTypes = async (req, res, next) => {
  try {
    const types = await Type.findAll();
    return res.status(200).json(types);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getOneType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingType = await Type.findOne({ where: { id } });

    if (!existingType) {
      return next(ApiError.badRequest("Type doesn`t exists."));
    }

    return res.status(200).json(existingType);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const deletedType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingType = await Type.findOne({ where: { id } });

    if (!existingType) {
      return next(ApiError.badRequest("Type doesn`t exists."));
    }

    await existingType.destroy();

    return res.status(200).json("Type successfully deleted");
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
