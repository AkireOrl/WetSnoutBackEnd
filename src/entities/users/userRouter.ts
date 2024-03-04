import express from 'express';
import { AuthController } from './authController';
import { userController } from './userController';

//----------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();
const UserController = new userController();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/", UserController.getAll);

export default router;