import express from "express";
import userRouter from "../src/entities/users/userRouter"





const router = express.Router();

router.use("/api/users", userRouter);
export default router;