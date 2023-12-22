import jwt from "jsonwebtoken";

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
