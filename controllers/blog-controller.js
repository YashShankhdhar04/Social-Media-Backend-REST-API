import Blog from "../model/blog-model.js";
import bcryptjs from "bcryptjs";
import User from "../model/user-model.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    return res.status(404).json({ msg: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

export const addBlogs = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(500).json({ msg: "Unable to find user by this id" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    // await blog.save();
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: err });
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, { title, description });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ msg: "Unable to update Blog" });
  }
  return res.status(200).json({ blog });
};

export const getbyId = async (req, res, next) => {
  const id = req.params.id;
  let blogs;
  try {
    blogs = await Blog.findById(id);
  } catch (error) {
    return res.status(404).json({ msg: "No Blogs Found" });
  }
  return res.status(200).json({ msg: "Not Found" });
};

export const deleteBlogById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blog.pull(blog);
  } catch (error) {
    return res
      .status(404)
      .json({ msg: `No Blogs Found eith this id${req.params.id}` });
  }
  if (!blog) {
    return res.status(400).json({ msg: "Unable to delete" });
  }
  return res.status(200).json({ msg: " Deletion successful" });
};



// https://youtu.be/_ee38nL13mE?t=4545