import express, { Request, Response, Router } from "express";
import {
  SignupZodSchema,
  SigninZodSchema,
  CreateRoomZodSchema,
} from "@repo/common/types";
const authRouter: Router = express.Router();

authRouter.post("/signup", (req: Request, res: Response) => {
  try {
    const { username, name, password } = req.body;

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

    console.log(username);
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
authRouter.post("/signin", (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

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

    console.log(username);
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default authRouter;
