import express from "express";
import userRouter from "../src/entities/users/userRouter"
import dogRouter from "../src/entities/dogs/dogRouter"
import appointmentRouter  from "../src/entities/appointments/appointmentRouter"



const router = express.Router();

router.use("/api/users", userRouter);
router.use("/api/dogs", dogRouter);
router.use("/api/appointment", appointmentRouter);
export default router;