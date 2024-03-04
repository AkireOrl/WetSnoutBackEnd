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

}