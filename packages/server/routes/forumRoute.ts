import express, { Router } from 'express'
import forumController from '../controllers/forumController'
import { messageController } from '../controllers/messageController'


const router: Router = express.Router()
//router.get('/forums', forumController.getAll)
router.get('/forums', forumController.findThemesForOnePage)
router.get('/onetheme', forumController.getOne)
router.get('/themecount', forumController.getCountThemes)
router.get('/theme', messageController.getAll)
router.post('/createtheme', forumController.create)
router.post('/createmes', messageController.create)

export default router