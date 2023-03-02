import express, { Router } from 'express';
import forumController from '../controllers/forumController';
import { messageController } from '../controllers/messageController';

const router: Router = express.Router();
router.get('/forums', forumController.findThemesForOnePage);
router.get('/oneforum', forumController.getOne);
router.get('/forumcount', forumController.getCountThemes);
router.get('/forummes', messageController.getAll);
router.get('/mes', messageController.getMesWithUserInfo);
router.post('/createforum', forumController.create);
router.post('/createmes', messageController.create);

export default router;
