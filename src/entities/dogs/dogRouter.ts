import express from 'express';
import { dogController } from './dogController';

//----------------------------------------------

const router = express.Router();

const DogController = new dogController();

router.get("/dogs", DogController.getAll);

export default router;