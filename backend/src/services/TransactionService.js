import { PrismaClient } from "@prisma/client";
import { TransactionRepository } from "../repositories/TransactionRepository.js";
const prisma = new PrismaClient()

export class TransactionService{
    constructor() {
        this.transactionRepository = new TransactionRepository()
    }

    async findAllTransactions(userId) {
        
        return await this.transactionRepository.findAll(userId)
    }
    
    async createTransaction(transaction, userId) {
        if(!userId) {
            throw new Error(`Usuário não autorizado`)
        }
         const customer = await prisma.customer.findFirst({
            where: {
                id: transaction.customerId,
                userId
            }})

            if(!customer) {
                throw new Error(`Cliente não encontrado ou usuário sem permissão`)
            }
            const newTransaction = {
                amount: transaction.amount,
                status: transaction.status,
                type: transaction.type,
                customerId : transaction.customerId
                 }
            return await this.transactionRepository.create(newTransaction)
    }

    async findTransactionById(id, userId) {
        const transaction = await this.transactionRepository.findById(id, userId)
        if(!transaction) {
            throw new Error(`Transação não encontrada com o ID: ${id}`)
        } 
        return transaction             
    }
}
