import { Request, Response } from "express";
import { CreateUserRequestBody, LoginUserRequestBody, TokenData } from "../../types/types";
import { AppDataSource } from "../../database/data-source";
import { User } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRoles } from "../../constants/UserRole";
import { StatusCodes } from "http-status-codes";

export class AuthController {
    async register(
        req: Request<{}, {}, CreateUserRequestBody>,
        res: Response
     ): Promise<void | Response<any>> {
        const { username, password, email } = req.body;
  
        const userRepository = AppDataSource.getRepository(User);
        
        try {
           // Verificar si el usuario ya existe
           const existingUser = await userRepository.findOne({
              where: { username },
           });
           if (existingUser) {
              return res.status(StatusCodes.BAD_REQUEST).json({
                 message: 'User already exists',
              });
           }
  
           // Crear nuevo usuario
           const newUser: User = {
              username,
              email,
              password: bcrypt.hashSync(password, 10),
              roles: [UserRoles.USER],
           };
           await userRepository.save(newUser);
  
           res.status(StatusCodes.CREATED).json({
              message: "Register successfully",
           });
        } catch (error: any) {
           console.error("Error while register:", error);
           res.status(500).json({
              message: "Error while register",
              error: error.message,
           });
        }
     }
    
 
    async login(
       req: Request<{}, {}, LoginUserRequestBody>,
       res: Response
    ): Promise<void | Response<any>> {
       const { password, email } = req.body;
 
       const userRepository = AppDataSource.getRepository(User);
 
       try {
          // Validar existencia de email y contraseña
          if (!email || !password) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Email or password is required",
             });
          }
 
          // Encontrar un usuario por email
          const user = await userRepository.findOne({
             where: {
                email: email,
             },
             relations: {
                roles: true,
             },
             select: {
                password: true,
                id: true,
                roles: {
                   role_name: true,
                },
             },
          });
 
          // Verificar usuario inexistente
          if (!user) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Bad email or password",
             });
          }
 
          // Verificar contraseña si el usuario existe
          const isPasswordValid = bcrypt.compareSync(
             password,
             user.password
          );
 
          // Verificar contraseña valida
          if (!isPasswordValid) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Bad email or password",
             });
          }
 
          // Generar token
 
          const roles = user.roles.map((role) => role.role_name);
 
          const tokenPayload: TokenData = {
             email: user.email,
             userId: user.id?.toString() as string,
             userRoles: roles,
          };
 
          const token = jwt.sign(tokenPayload, "123", {
             expiresIn: "3h",
          });
 
          res.status(StatusCodes.OK).json({
             message: "Login successfully",
             token,
          });
       } catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
             message: "Error while login",
             error,
          });
       }
    }
 }