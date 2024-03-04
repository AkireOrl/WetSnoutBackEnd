import express from "express";
import userRouter from "../src/entities/users/userRouter"
import dogRouter from "../src/entities/dogs/dogRouter"




const router = express.Router();

router.use("/api/users", userRouter);
router.use("/api/dogs", dogRouter);
export default router;