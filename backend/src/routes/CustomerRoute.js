import express from 'express'
import { CustomerController } from '../controllers/CustomerController.js'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'
const router = express.Router()
const controller = new CustomerController()
router.use(AuthMiddleware)

router.get('/find', controller.findAllCustomers.bind(controller))


export default router