import express from 'express'
import { CostumerController } from '../controllers/CostumerController.js'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'
const router = express.Router()
const controller = new CostumerController()
router.use(AuthMiddleware)

router.get('/find', controller.findAllCostumers.bind(controller))


export default router