import bcrypt from "bcrypt";
import { Op } from "sequelize";

//error
import { ApiError } from "../error/ApiError.js";

//helper
import { createJWT } from "../helpers/helpers.js";

//models
import { User, UserCart } from "../models/models.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existedUser = await User.findOne({
      where: { email },
    });

    if (!existedUser) {
      return next(ApiError.unauthorized("User doesn`t exist."));
    }

    const comparePassword = bcrypt.compareSync(password, existedUser.password);

    if (!comparePassword) {
      return next(ApiError.unauthorization("Wrong password!"));
    }

    const token = createJWT({
      id: existedUser.id,
      email: existedUser.email,
      name: existedUser.name,
      phone: existedUser.phone,
      role: existedUser.role,
      image: existedUser.image,
    });

    const cart = await UserCart.findOne({ where: { userId: existedUser.id } });

    return res.status(200).json({ user: existedUser, cart, token });
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const registration = async (req, res, next) => {
  try {
    const { name, phone, email, password, image, role } = req.body;

    if (name.trim().length < 3) {
      return next(
        ApiError.badRequest({
          name: "Name must be longer than 3 characters ",
        })
      );
    }

    if (email.trim().length < 10) {
      return next(
        ApiError.badRequest({
          email: "Email must be longer than 10 characters ",
        })
      );
    }

    if (password.trim().length < 6) {
      return next(
        ApiError.badRequest({
          password: "Password must be longer than 6 characters ",
        })
      );
    }

    if (phone.trim().length < 9) {
      return next(
        ApiError.badRequest({
          phone: "Phone must be longer than 6 characters ",
        })
      );
    }

    if (name.trim().length < 3) {
      return next(
        ApiError.badRequest({
          name: "Name must be longer than 3 characters ",
        })
      );
    }

    const existedUser = await User.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });

    if (existedUser) {
      return next(ApiError.badRequest("This user already exists."));
    }

    const hashPassword = bcrypt.hashSync(password, 5);

    const createdUser = await User.create({
      name,
      phone,
      email,
      password: hashPassword,
      image,
      role,
    });

    const createdCart = await UserCart.create({ userId: createdUser.id });

    const token = createJWT({
      id: createdCart,
      name,
      phone,
      email,
      image,
      role,
    });

    return res
      .status(200)
      .json({ user: createdUser, cart: createdCart, token });
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existedUser = await User.findOne({
      where: { id },
    });

    if (!existedUser) {
      return next(ApiError.badRequest("User doesn't exist."));
    }

    await existedUser.destroy();

    return res.status(200).json("User successfully deleted");
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
