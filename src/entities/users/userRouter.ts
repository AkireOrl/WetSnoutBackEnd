import express from 'express';
import { AuthController } from './authController';
import { userController } from './userController';
import { auth } from '../../middlewares/auth';

//----------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();
const UserController = new userController();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/", UserController.getAll);
router.get("/todos", UserController.getAllUsersFor);
router.patch("/",auth, UserController.update);
router.patch("/updatestate/:id", UserController.updateActive);
router.delete("/:id", UserController.delete);
export default router;