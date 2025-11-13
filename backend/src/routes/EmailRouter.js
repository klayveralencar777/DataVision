import express from 'express'
import { EmailController} from '../controllers/EmailController.js'
const router = express.Router()
const controller = new EmailController()
router.post('/send-login', controller.sendEmail.bind(controller))

export default router
