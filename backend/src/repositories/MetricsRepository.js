import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class MetricsRepository {
    constructor() {}

    async countCustomers(userId) {
        return await prisma.customer.count({ where: {userId} })
    }
    
    async countActiveCustomers(userId) {
        return await prisma.customer.count({
            where: {userId, status: "ativo"}
        })
    }
    async countTransactions(userId) {
        return await prisma.transaction.count({ 
            where: { customer : {userId}}
        
        })
    }

    async amountTransactions(userId) {
        const result = await prisma.transaction.aggregate({
            where: { customer : {userId}},
            _sum: { amount: true}
        })
        return result._sum.amount || 0       
    }
    
    

}

