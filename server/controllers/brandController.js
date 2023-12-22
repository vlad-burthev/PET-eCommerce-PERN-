import { ApiError } from "../error/ApiError.js";
import { Brand } from "../models/models.js";

export const createBrand = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingBrand = await Brand.findOne({ where: { name } });

    if (existingBrand) {
      return next(ApiError.badRequest("Brand already exists."));
    }

    await Brand.create({ name });

    return res.status(200).json("Brand successfully created");
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getAllBrands = async (req, res, next) => {
  try {
    const Brands = await Brand.findAll();
    return res.status(200).json(Brands);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getOneBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingBrand = await Brand.findOne({ where: { id } });

    if (!existingBrand) {
      return next(ApiError.badRequest("Brand doesn`t exists."));
    }

    return res.status(200).json(existingBrand);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const deletedBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingBrand = await Brand.findOne({ where: { id } });

    if (!existingBrand) {
      return next(ApiError.badRequest("Brand doesn`t exists."));
    }

    await existingBrand.destroy();

    return res.status(200).json("Brand successfully deleted");
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
