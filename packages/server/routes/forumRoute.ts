import express, { Router } from 'express'
import forumController from '../controllers/forumController'


const router: Router = express.Router()
router.get('/', forumController.getAll)


export default router