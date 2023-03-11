import User from "../model/user-model.js";
import bcryptjs from "bcryptjs";

//getalltasks
///api/users/signup
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No  Users Found" });
  }
  return res.status(200).json({ users });
};

// {Signup}
// /api/users/signup
export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: " User Already Exist! Login Instead" });
  }
  const hashedPassword = bcryptjs.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs:[]
  });
  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
};



// {Login}
// /api/users/login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  // let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: " User Not Found ... SignUp Instead" });
  }
  const isPasswordCorrect = bcryptjs.compareSync(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Wrong Password" });
  }
  return res.status(200).json({ message: "Login Successful" });
};
