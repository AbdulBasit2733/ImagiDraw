import express from "express";
import authRouter from "./routes/auth.route";
import roomRouter from "./routes/room.route";

const app = express();


app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/room', roomRouter)


app.listen(3001, () => {
  console.log("Running Http backend");
});
