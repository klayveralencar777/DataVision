import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class TransactionRepository {
    constructor() {}

    async findAll(userId) {
        return await prisma.transaction.findMany({
            where: {
                customer: { userId }
            }})
    }
    async create(data) {
        return await prisma.transaction.create({data})      
    }
    
    async findById(id, userId) {
        return await prisma.transaction.findFirst({ where: {
            id: id,
            customer: { userId }
        }})

    }
}
