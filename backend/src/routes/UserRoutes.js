import express from 'express'
import { UserController } from '../controllers/UserController.js'
const router = express.Router()
const controller = new UserController()
router.get('/find', controller.findAllUsers.bind(controller))
router.get('/find/email/:email', controller.findUserByEmail.bind(controller))


export default router
