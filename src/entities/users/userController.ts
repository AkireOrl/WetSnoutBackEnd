import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { User } from "./userModel";
import { Role } from "../roles/roleModel";



export class userController {
    async getAll(req: Request, res: Response): Promise<void | Response<any>> {
        try{
            const userRepository = AppDataSource.getRepository(User);
            const userRoles = AppDataSource.getRepository(Role);

            
         const page = req.query.page  ? Number(req.query.page) : null;
         const limit = req.query.limit ? Number(req.query.limit) : null;


         interface filter {
            [key: string]: any;
         }
         const filter: filter = {
            select: {
               username: true,
               first_name: true,
               last_name: true,
               photo:true,
               email: true,
               id: true,
            },
            relations: ['role'],  // Incluir la relación con el rol
         };

         if (page && limit ) {
            filter.skip = ((page- 1) * limit)

         }
         if (limit) {
            filter.take = (limit)
         }

         const [allUsers, count] = await userRepository.findAndCount(filter);
         res.status(200).json({
            count,
            limit,
            page,
            results: allUsers,
         });

      } catch (error) {
         res.status(500).json({
            message: "Error while getting users",
         });
      }
}


async getAllUsersFor(req: Request, res: Response): Promise<Response> {
const { token, page, role, name } = req.query;
    
const userRepository = AppDataSource.getRepository(User);

const query = userRepository
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.roles", "role")
  .select([
    "user.id",
    "user.username",
    "user.first_name",
    "user.last_name",
    "user.photo",
    "user.email",
    "role.role_name",
  ]);

if (role) {
  query.where("role.role_name = :role", { role });
}

if (name) {
  query.andWhere("user.name = :name", { name });
}

const skipAmount = page ? (Number(page) - 1) * 10 : 0;
const [users, total] = await query
  .skip(skipAmount)
  .take(10)
  .getManyAndCount();

return res.status(200).json({ token, users, total });
}

async getById(req: Request, res: Response): Promise<void | Response<any>> {
    try {
       const id = +req.params.id;

       const userRepository = AppDataSource.getRepository(User);
       const user = await userRepository.findOneBy({
          id: id,
       });

       if (!user) {
          return res.status(404).json({
             message: "User not found",
          });
       }

       res.status(200).json(user);
    } catch (error) {
       res.status(500).json({
          message: "Error while getting user del getbyId",
       });
    }
 }

 async update(req: Request, res: Response): Promise<void | Response<any>> {
   try {
      const id = +req.tokenData.userId;
      const data = req.body;

      const userRepository = AppDataSource.getRepository(User);
      await userRepository.update( {id},data);

      res.status(202).json({
         message: "User updated successfully",
      });
   } catch (error) {
      
      res.status(500).json({
         message: "Error while updating user",
         
      });
   }

}

async delete(req: Request, res: Response): Promise<void | Response<any>> {
   try {
      const id = +req.params.id;

      const userRepository = AppDataSource.getRepository(User);
      await userRepository.delete(id);

      res.status(200).json({
         message: "User deleted successfully",
      });
   } catch (error: any) {
      console.error("Error while delete users:", error);
      res.status(500).json({
         message: "Error while delete users",
         error: error.message,
      });
   }
}

async updateActive(req: Request, res: Response): Promise<void | Response<any>> {
   try{
      const id = parseInt(req.params.id);
      const {is_active} = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({id});
      if  (!user) {
         return res.status(404).json({ error: 'Usuario no encontrado' });
         }
        
      // Actualiza el campo 'active' del usuario
      user.is_active = is_active;

      // Guarda los cambios en la base de datos
      await userRepository.save(user);

      // Responde con el usuario actualizado
      res.json(user);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}