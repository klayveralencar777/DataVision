import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class MetricsRepository {
    constructor() {}

    async countCustomers(userId) {
        return await prisma.customer.count({ where: {userId} })
    }
    
    async countTransactions(userId) {
        return await prisma.transaction.count({ 
            where: { customer : {userId}}
        
        })
    }
}

