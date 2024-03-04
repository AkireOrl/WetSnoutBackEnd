import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { Dog } from "./dogModel";
import { Role } from "../roles/roleModel";



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


// async getAllUsersFor(req: Request, res: Response): Promise<Response> {
// const { token, page, role, name } = req.query;
    
// const dogRepository = AppDataSource.getRepository(Dog);

// const query = dogRepository
//   .createQueryBuilder("user")
//   .leftJoinAndSelect("user.roles", "role")
//   .select([
//     "name",
//     "race",
//     "age",
//     "size",
//     "weight",
//     "sociable",
//     "photo",
//     "gallery",
//     "is_active",
//     "id",
//   ]);

// if (role) {
//   query.where("role.role_name = :role", { role });
// }

// if (name) {
//   query.andWhere("dog.name = :name", { name });
// }

// const skipAmount = page ? (Number(page) - 1) * 10 : 0;
// const [dogs, total] = await query
//   .skip(skipAmount)
//   .take(10)
//   .getManyAndCount();

// return res.status(200).json({ token, dogs, total });
// }

// async getById(req: Request, res: Response): Promise<void | Response<any>> {
//     try {
//        const id = +req.params.id;

//        const dogRepository = AppDataSource.getRepository(Dog);
//        const dog = await dogRepository.findOneBy({
//           id: id,
//        });

//        if (!dog) {
//           return res.status(404).json({
//              message: "Dog not found",
//           });
//        }

//        res.status(200).json(dog);
//     } catch (error) {
//        res.status(500).json({
//           message: "Error while getting user del getbyId",
//        });
//     }
//  }

}