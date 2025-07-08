import express, { Request, Response, Router } from "express";

const authRouter: Router = express.Router();

authRouter.post("/signup", (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

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
    const { email, password } = req.body;

    console.log(email);
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
