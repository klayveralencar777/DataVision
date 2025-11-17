import { PrismaClient } from "@prisma/client";
import { TransactionRepository } from "../repositories/TransactionRepository.js";
import { EntityNotFound, UnauthorizedError } from "../exceptions/Exceptions.js";
const prisma = new PrismaClient()

export class TransactionService{
    constructor() {
        this.transactionRepository = new TransactionRepository()
    }

    async findAllTransactions(userId) {
        this.checkUser(userId)
        return await this.transactionRepository.findAll(userId)
    }
    
    async createTransaction(transaction, userId) {
        this.checkUser(userId)
         const customer = await prisma.customer.findFirst({
            where: {
                id: transaction.customerId,
                userId
            }})

            if(!customer) {
                throw new EntityNotFound(`Cliente não encontrado ou usuário sem permissão`)
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
            throw new EntityNotFound(`Transação não encontrada com o ID: ${id}`)
        } 
        return transaction             
    }

    checkUser(userId) {
        if(!userId) {
            throw new UnauthorizedError(`Usuário não autenticado`)
        }
    }
}
