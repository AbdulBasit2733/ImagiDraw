import express, { Request, Response, Router } from "express";
import {
  SignupZodSchema,
  SigninZodSchema,
  CreateRoomZodSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { authMiddleware, ExtendedRequest } from "../middleware/auth.middleware";
const authRouter: Router = express.Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const validationResult = SignupZodSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errMessages =
        validationResult &&
        validationResult.error.errors.map((err) => err.message);
      res.status(400).json({
        success: false,
        message: errMessages[0],
      });
      return;
    }

    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: validationResult.data.email,
      },
    });

    if (existingUser) {
      res.status(300).json({
        success: false,
        message: "Email is already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prismaClient.user.create({
      data: {
        email: validationResult.data.email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      success: false,
      message: "Registered Successfully",
    });

    // console.log(username);
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
authRouter.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const validationResult = SigninZodSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errMessages =
        validationResult &&
        validationResult.error.errors.map((err) => err.message);
      res.status(400).json({
        success: false,
        message: errMessages[0],
      });
      return;
    }
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: validationResult.data.email,
      },
    });
    if (!existingUser) {
      res.status(400).json({
        success: false,
        message: "Email or password is wrong",
      });
      return;
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      res.status(300).json({
        success: false,
        message: "Email or password is incorrect",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
      },
      JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24hr
    });

    res.status(200).json({
      success: true,
      message: "Login Successfully",
    });
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// authRouter.get('/check-auth', authMiddleware, (req: Request, res: Response) => {
//   const user = (req as import("../middleware/auth.middleware").ExtendedRequest).user;
//   res.status(200).json({
//     success: true,
//     message: "Authenticated",
//     data: user
//   });
//   return;
// });

export default authRouter;
