import express from 'express'
import { AuthMiddleware} from '../middlewares/AuthMiddleware.js'
import { TransactionController } from '../controllers/TransactionController.js'

const router = express.Router()
router.use(AuthMiddleware)
const controller = new TransactionController()
router.get('/find', controller.findAllTransactions.bind(controller))
router.get('/find/:id', controller.findTransactionById.bind(controller))
router.post('/create', controller.createTransaction.bind(controller))



export default router