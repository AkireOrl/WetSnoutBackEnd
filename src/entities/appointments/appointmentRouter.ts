import express from "express";
import { AppointmentController } from "./appointmentController";
import { isSuperAdmin } from "../../middlewares/isSuperAdmin";
import { auth } from "../../middlewares/auth";



const router = express.Router();
const appointmentController= new AppointmentController();

router.get("/", auth, isSuperAdmin, appointmentController.getAllAppointments);
router.post("/", appointmentController.create);

export default router;