import express, { Router } from 'express';
import { userController } from '../controllers/userController';

const router: Router = express.Router();
router.get('/users', userController.getAll);
router.get('/user', userController.getOne);
router.post('/createuser', userController.create);

export default router;
