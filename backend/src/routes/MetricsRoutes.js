import express from 'express'
import { MetricsController } from '../controllers/MetricsController.js'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'
const router = express.Router()
const controller = new MetricsController()
router.use(AuthMiddleware)
router.get('/', controller.countCustomers.bind(controller))

export default router