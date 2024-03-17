import express from "express";
import { AppointmentController } from "./appointmentController";
import { isSuperAdmin } from "../../middlewares/isSuperAdmin";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import { isUser } from "../../middlewares/isUser";



const router = express.Router();
const appointmentController= new AppointmentController();

router.get("/", auth, isAdmin, appointmentController.getAllAppointments);
router.post("/", appointmentController.create);
router.patch("/:id", auth, isSuperAdmin, appointmentController.update );
 router.delete("/:id", auth, isSuperAdmin, appointmentController.delete);
 router.get("/miscitasuser/:id", auth,  appointmentController.getByUserId);
 router.patch("/appostate/:id",auth, appointmentController.updateAppointmentActive);

export default router;