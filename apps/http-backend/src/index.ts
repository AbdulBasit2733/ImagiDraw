import express from "express";
import authRouter from "./routes/auth.route";

const app = express();


app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/room', authRouter)


app.listen(3001, () => {
  console.log("Running Http backend");
});
