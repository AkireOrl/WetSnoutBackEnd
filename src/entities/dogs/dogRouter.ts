import express from 'express';
import { dogController } from './dogController';
import { auth } from '../../middlewares/auth';
import { isAdmin } from '../../middlewares/isAdmin';
import { isSuperAdmin } from '../../middlewares/isSuperAdmin';

//----------------------------------------------

const router = express.Router();

const DogController = new dogController();

router.get("/dogs", DogController.getAll);
router.post("/dogs",auth, isAdmin, DogController.create);
router.patch("/dogs/:id", auth, isAdmin, DogController.update);
router.patch("/updatedogstate/:id",auth, isSuperAdmin, DogController.updateDogActive);

export default router;