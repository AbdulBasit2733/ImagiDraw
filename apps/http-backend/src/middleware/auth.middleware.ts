import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

interface ExtendedRequest extends Request {
  user: {
    id: string;
  };
}

export const authMiddleware = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"] ?? "";
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token Not Found",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
      //@ts-ignore
      req.user = decoded.id;
      next();
    }
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
