import express from 'express'
import { AuthController } from '../auth/AuthController.js'
const router = express.Router()
const controller = new AuthController()

router.post('/sign-in', controller.userLogin.bind(controller))


export default router