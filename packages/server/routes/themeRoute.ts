import express, { Router } from 'express'
import { themeController } from '../controllers/themeController'


const router: Router = express.Router()
router.get('/themes', themeController.getAll)
router.get('/theme', themeController.getOne)
router.post('/createtheme', themeController.create)


export default router