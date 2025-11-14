import express from 'express'
import { CustomerController } from '../controllers/CustomerController.js'
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js'
const router = express.Router()
const controller = new CustomerController()
router.use(AuthMiddleware)

router.get('/find', controller.findAllCustomers.bind(controller))
router.get('/find/:id', controller.findCustomerById.bind(controller))
router.get('/find/email/:email', controller.findCustomerByEmail.bind(controller))
router.post('/create', controller.createCustomer.bind(controller))
router.delete('/delete/:id', controller.deleteCustomerById.bind(controller))
router.delete('/delete/email/:email', controller.deleteCustomerByEmail.bind(controller))



export default router