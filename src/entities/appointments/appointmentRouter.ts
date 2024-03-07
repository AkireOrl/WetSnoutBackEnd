import express from "express";
import { AppointmentController } from "./appointmentController";
import { isSuperAdmin } from "../../middlewares/isSuperAdmin";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";



const router = express.Router();
const appointmentController= new AppointmentController();

router.get("/", auth, isSuperAdmin, appointmentController.getAllAppointments);
router.post("/", appointmentController.create);
router.patch("/:id", auth, isSuperAdmin, appointmentController.update );
 router.delete("/:id", auth, isSuperAdmin, appointmentController.delete);
export default router;