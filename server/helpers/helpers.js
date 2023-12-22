import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

export const createJWT = ({ id, email, name, phone, role, image }) => {
  const token = jwt.sign(
    { id, email, name, phone, role, image },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );

  return token;
};
