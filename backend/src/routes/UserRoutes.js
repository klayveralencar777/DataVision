import express from 'express'
import { UserController } from '../controllers/UserController.js'
const router = express.Router()
const controller = new UserController()
router.get('/', controller.findAllUsers.bind(controller))


export default router
