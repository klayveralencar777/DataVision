import { TransactionService } from "../services/TransactionService.js";

export class TransactionController{
    constructor() {
        this.transactionService = new TransactionService()
    }

    async findAllTransactions(req, res ) {
        try {
            const transactions = await this.transactionService.findAllTransactions(req.user.id)
            return res.status(200).json(transactions)
            
        } catch (error) {
            console.log(error)
            return res.status(401).json({error: error.message})
        }
    }
    async createTransaction(req, res, next) {
        
        try {
            const newTransaction = await this.transactionService.createTransaction(req.body, req.user.id)
            return res.status(201).json(newTransaction)
            
         } catch (error) {
            next(error)
            
        }

    }
    async findTransactionById(req, res, next) {
        try {
            const transaction = await this.transactionService.findTransactionById(req.params.id, req.user.id)
            return res.status(201).json(transaction)
            
        } catch (error) {
            next(error)
            
        }
    }
}