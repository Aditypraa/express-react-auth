import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

// import Route
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// Initialize
const app = express();
const api = "/api";
const port = 3000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true })); // sebagai parse application/x-www-form-urlencoded untuk form data
app.use(bodyParser.json()); // sebagai parse application/json untuk json data

//route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(api, authRouter);
app.use(api, userRouter);

//start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
