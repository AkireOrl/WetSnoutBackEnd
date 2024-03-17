import { Request, Response } from "express";
import { Appointment } from "./appointmentModel";
import { AppDataSource } from "../../database/data-source";
import { User } from "../users/userModel";
import { Dog } from "../dogs/dogModel";
import { CreateAppointmentsRequestBody } from "../../types/types";



//---------------------------------------------------------------------

export class AppointmentController {
    async getAllAppointments(req: Request, res: Response): Promise<void> {
        try {
          const role = req.tokenData.userRoles;
          const appointmentRepository = AppDataSource.getRepository(Appointment);
          const appointments = await appointmentRepository.find({
            relations: ['user', 'dog'], // Agrega esto para obtener la información relacionada de la entidad User y Dog
          });
          res.status(200).json(appointments);
        } catch (error) {
          console.error('Error al obtener todas las citas:', error);
          res.status(500).json({
            message: 'Error al obtener todas las citas',
          
          });
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

    // Verifica que la combinación de dog_id, date y hour no exista ya
    const existingAppointment = await appointmentRepository
      .createQueryBuilder('appointment')
      .where('appointment.dog_id = :dogId', { dogId: dog_id })
      .andWhere('appointment.date = :date', { date: newAppointmentDate })
      .andWhere('appointment.hour = :hour', { hour })
      .getCount();

    if (existingAppointment > 0) {
      return res.status(400).json({
        error: 'La combinación de fecha, hora y perro ya existe.',
      });
    }

    const newAppointment: Appointment = new Appointment();
    newAppointment.user_id = user_id;
    newAppointment.dog_id = dog_id;
    newAppointment.activity_id = activity_id;
    newAppointment.date = newAppointmentDate;
    newAppointment.hour = hour;
    newAppointment.is_active = Boolean(true);

    await appointmentRepository.save(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error: any) {
    console.error('Error while creating Appointment:', error);
    res.status(500).json({
      message: 'Error while creating Appointment',
      error: error.message,
    });
  }
}

async update(req: Request, res: Response): Promise<void | Response<any>> {
  try {
     const id = +req.params.id;
     const data = req.body;

     const appointmentRepository = AppDataSource.getRepository(Appointment);
     const appointmentUpdated = await appointmentRepository.update({ id: id }, data);
     res.status(202).json({
        message: "Appointment updated successfully",
     });
  } catch (error) {
     res.status(500).json({
        message: "Error while updating appointment",
     });
  }
}
async delete(req: Request, res: Response): Promise<void | Response<any>> {
  try {
     const id = +req.params.id;

     const appointmentRepository = AppDataSource.getRepository(Appointment);
     await appointmentRepository.delete(id);

     res.status(200).json({
        message: "Appointment deleted successfully",
     });
  } catch (error) {
     res.status(500).json({
        message: "Error while deleting appointment",
     });
  }
}

async getByUserId(req: Request, res: Response): Promise<void | Response<any>> {
  try {
    const id = +req.params.id;
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const appointments = await appointmentRepository.findBy({
      user_id: id,
    });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({
        message: "Appointments not found for the user",
      });
    }

    const userAppointments = [];
    for (const appointment of appointments) {
      const dogRepository = AppDataSource.getRepository(Dog);
      const dog = await dogRepository.findOneBy({ id: appointment.dog_id });

      if (dog) {
        userAppointments.push({
          appointment_id: appointment.id,
          date: appointment.date,
          hour: appointment.hour,
          is_active: appointment.is_active,
          // Agrega más campos de la cita según sea necesario
          dog_profile: {
            dog_id: dog.id,
            photo: dog.photo,
            name: dog.name,
            age:  dog.age,
            size: dog.size,
            race: dog.race,
            sociable: dog.sociable,
            // Agrega más campos del perfil del perro según sea necesario
          },
        });
      }
    }

    res.status(200).json({
      user_id: id,
      appointments: userAppointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getting appointments",
    });
  }
}

async updateAppointmentActive(req: Request, res: Response): Promise<void | Response<any>> {
  try{
     const id = parseInt(req.params.id);
     const {is_active} = req.body;

     const AppointmentRepository = AppDataSource.getRepository(Appointment);
     const appointment = await AppointmentRepository.findOneBy({id});
     if  (!appointment) {
        return res.status(404).json({ error: 'Cita no encontrada' });
        }
       
     // Actualiza el campo 'active' del animal
     appointment.is_active = is_active;

     // Guarda los cambios en la base de datos
     await AppointmentRepository.save(appointment);

     // Responde con el animal actualizado
     res.json(appointment);
     console.log(appointment, "soy servidor")
   } catch (error) {
     console.error('Error al actualizar la cita:', error);
     res.status(500).json({ error: 'Error interno del servidor' });
   }
 }
}

