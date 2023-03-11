// console.log('Hello world')
import express from "express";
import mongoose from "mongoose";
// import { getAllUsers } from "./controllers/user-controller.js";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
// app.use("/api", () => (req, res, next) => {
//   res.json("Hello World");
// });
const port = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port);
  })
  .then(() => {
    console.log(`Connected to database and listenig to local host ${port}`);
  })
  .catch((err) => console.log(err));
// app.listen(5001);
