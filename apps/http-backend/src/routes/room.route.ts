import express, { Request, Response, Router } from "express";

const roomRouter: Router = express.Router();

roomRouter.post("/create-room", (req: Request, res: Response) => {
  try {
    const { name } = req.body;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default roomRouter;
