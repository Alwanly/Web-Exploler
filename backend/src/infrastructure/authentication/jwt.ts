import jwt from "jsonwebtoken";
import Config from "@config";

import { User } from "@domain/auth";
export const generateToken = (user: Omit<User, "password">): string => {
  return jwt.sign(
    { id: user.id, username: user.username },
    Config.jwtAuth.secret,
    {
      expiresIn: "1d",
    },
  );
};

export const verifyToken = (token: string): Omit<User, "password"> => {
  return jwt.verify(token, Config.jwtAuth.secret) as Omit<User, "password">;
};
