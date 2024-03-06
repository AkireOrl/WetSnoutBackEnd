import { Request, Response } from "express";
import { Appointment } from "./appointmentModel";
import { AppDataSource } from "../../database/data-source";
import { User } from "../users/userModel";
import { Dog } from "../dogs/dogModel";
import { CreateAppointmentsRequestBody } from "../../types/types";



//---------------------------------------------------------------------

export class AppointmentController {
    async getAllAppointments(req: Request, res: Response): Promise<Appointment[]> {
        try {
          const appointmentRepository = AppDataSource.getRepository(Appointment);
          const appointments = await appointmentRepository.find();
          return appointments;
        } catch (error) {
          console.error('Error al obtener todas las citas:', error);
          throw new Error('Error al obtener todas las citas');
        }
    }


async create(
req: Request<{}, {}, CreateAppointmentsRequestBody>,
res: Response
): Promise<void | Response<any>> {
const { user_id, dog_id, activity_id, date, hour, is_active } = req.body;

const appointmentRepository = AppDataSource.getRepository(Appointment);
try {
  const newAppointmentDate = new Date(date);

  // Verifica que la fecha no sea pasada
  const now = new Date();
  if (newAppointmentDate < now) {
    return res.status(400).json({
      error: 'La fecha no puede ser en el pasado',
    });
  }

  const newAppointment: Appointment = {
    user_id: user_id,
    dog_id: dog_id,
    activity_id: activity_id,
    date: newAppointmentDate,
    hour,
    is_active: Boolean(true),
  };

  await appointmentRepository.save(newAppointment);
  res.status(201).json(newAppointment);
} catch (error: any) {
  console.error("Error while creating Appointment:", error);
  res.status(500).json({
    message: "Error while creating Appointment",
    error: error.message,
  });
}
}
}