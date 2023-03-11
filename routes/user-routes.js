import express from "express";
// import { getAllUser } from "../controllers/user-controller";
import {getAllUsers, loginUser, signUp} from '../controllers/user-controller.js'
const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signUp);
router.post("/login",loginUser)

export default router;
