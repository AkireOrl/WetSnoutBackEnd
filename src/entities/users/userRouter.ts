import express from 'express';
import { AuthController } from './authController';
import { userController } from './userController';
import { auth } from '../../middlewares/auth';
import { isSuperAdmin } from '../../middlewares/isSuperAdmin';

//----------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();
const UserController = new userController();

router.post("/register", authController.register);
router.post("/login", authController.login);

// router.get("/", UserController.getAll);
router.get("/todos",auth, isSuperAdmin, UserController.getAllUsersFor);
router.patch("/",auth, UserController.update);
router.patch("/updatestate/:id",auth, isSuperAdmin, UserController.updateActive);
router.patch("/updaterole/:id",auth, isSuperAdmin, UserController.updateRole);
router.delete("/:id",auth, isSuperAdmin, UserController.delete);
export default router;