import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { Dog } from "./dogModel";
import { Role } from "../roles/roleModel";
import { StatusCodes } from "http-status-codes";
import { CreateDogRequestBody } from "../../types/types";



export class dogController {
    async getAll(req: Request, res: Response): Promise<void | Response<any>> {
        try{
            const dogRepository = AppDataSource.getRepository(Dog);
            const userRoles = AppDataSource.getRepository(Role);

            
         const page = req.query.page  ? Number(req.query.page) : null;
         const limit = req.query.limit ? Number(req.query.limit) : null;


         interface filter {
            [key: string]: any;
         }
         const filter: filter = {
            select: {
               name: true,
               race: true,
               age: true,
               size:true,
               gender: true,
               weight: true,
               sociable:true,
               photo: true,
               gallery: true,
               is_active: true,
               id: true,
            },
         };

         if (page && limit ) {
            filter.skip = ((page- 1) * limit)

         }
         if (limit) {
            filter.take = (limit)
         }

         const [allDogs, count] = await dogRepository.findAndCount(filter);
         res.status(200).json({
            count,
            limit,
            page,
            results: allDogs,
         });

      } catch (error) {
         res.status(500).json({
            message: "Error while getting users",
         });
      }
}

async create(
   req: Request<{}, {}, CreateDogRequestBody>,
   res: Response
): Promise<void | Response<any>> {
   const { name, race, age, size, gender, weight, sociable, photo, gallery, } = req.body;

   const dogRepository = AppDataSource.getRepository(Dog);

   try {
      // Crear nuevo Perro
      const newDog: Dog = {
         name,
         race,
         age,
         size,
         gender, 
         weight,
         sociable,
         photo,
         gallery,

      };
      await dogRepository.save(newDog);


      res.status(StatusCodes.CREATED).json({
         message: "Dog created successfully",
      });
   } catch (error: any) {
      console.error("Error while creating User:", error);
      res.status(500).json({
         message: "Error while creating Dog",
         error: error.message,
      });
   }
}
async update(req: Request, res: Response): Promise<void | Response<any>> {
   try {
      const id = parseInt(req.params.id);
      const data = req.body;

      const dogRepository = AppDataSource.getRepository(Dog);
      await dogRepository.update({id}, data);

      res.status(202).json({
         message: "Dog updated successfully",
      });
   } catch (error) {
      res.status(500).json({
         message: "Error while updating dog",
      });
   }
}

async updateDogActive(req: Request, res: Response): Promise<void | Response<any>> {
   try{
      const id = parseInt(req.params.id);
      const {is_active} = req.body;

      const dogRepository = AppDataSource.getRepository(Dog);
      const dog = await dogRepository.findOneBy({id});
      if  (!dog) {
         return res.status(404).json({ error: 'Animal no encontrado' });
         }
        
      // Actualiza el campo 'active' del animal
      dog.is_active = is_active;

      // Guarda los cambios en la base de datos
      await dogRepository.save(dog);

      // Responde con el animal actualizado
      res.json(dog);
    } catch (error) {
      console.error('Error al actualizar el perrete:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

}