import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
export interface ExtendedRequest extends Request {
  user: {
    id:string,
    email:string,
    name?:string,
    photo?:string
  };
}

export const authMiddleware = async (
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
      const userData = await prismaClient.user.findFirst({
        where: {
          //@ts-ignore
          id: decoded.id,
        },
      });
      if (!userData) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
      req.user = {
        id: userData.id,
        email: userData.email,
        name: userData.name ?? undefined,
        photo: userData.photo ?? undefined,
      };
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
