import express from 'express';
import { dogController } from './dogController';

//----------------------------------------------

const router = express.Router();

const DogController = new dogController();

router.get("/dogs", DogController.getAll);
router.post("/dogs", DogController.create);
router.patch("/dogs/:id", DogController.update);

export default router;