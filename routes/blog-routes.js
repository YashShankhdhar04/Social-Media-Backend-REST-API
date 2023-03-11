import express from "express";
// import express from "express";
import { addBlogs, deleteBlogById, getAllBlogs, getbyId, updateBlog } from "../controllers/blog-controller.js";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlogs);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getbyId);
blogRouter.delete("/:id", deleteBlogById);




export default blogRouter;
