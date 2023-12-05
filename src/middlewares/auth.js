import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const auth = () => async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(
        res.status(401).json({
          status: 401,
          message: "Plaese authentication!",
        })
      );
    }

    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );
    if (!decoded) {
      return next(new Error("Please enter valid token!"));
    }

    const user = await User.findOne({ _id: decoded.user });
    if (!user) {
      return next(new Error("Please authentication!"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new Error(error));
  }
};

export default auth;
