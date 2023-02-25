import express, { Router } from 'express'
import forumController from '../controllers/forumController'


const router: Router = express.Router()
//router.get('/forums', forumController.getAll)
router.get('/forums', forumController.findThemesForOnePage)
router.get('/themecount', forumController.getCountThemes)
router.post('/createtheme', forumController.create)


export default router