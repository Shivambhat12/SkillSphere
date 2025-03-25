import express from "express";
import {
  getUserData,
  userEnrolledCourses,
} from "../controllers/usercontroller.js";

const userRouter = express.Router();

userRouter.get("/data", getUserData);
userRouter.get("/enrolled-courses", userEnrolledCourses);

export default userRouter;
