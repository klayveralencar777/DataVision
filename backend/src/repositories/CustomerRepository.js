import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class CustomerRepository {
    constructor() {}

    async findAll(userId) {
       return await prisma.customer.findMany({ where:  {userId}})    
        
    }
    async create(customer, userId) {
        return await prisma.customer.create({
            data: {
                ...customer,
                userId
                         
            }
        })
    }
    async findById(id, userId) {
        return await prisma.customer.findFirst({ where: {id, userId}})
       
    }

    async findByEmail(email, userId) {
        return await prisma.customer.findFirst({ where: {email, userId}})
    }

    async findByIdTransactions(id, userId){
        return await prisma.customer.findFirst({ 
            where: {id, userId},
            include: { transactions: true}
        })

    }
    async findByEmailTransactions(email, userId) {
        return await prisma.customer.findFirst({
            where: { email, userId},
            include: { transactions : true}
        })
    }

    async deleteById(id, userId) {
        return await prisma.customer.deleteMany({ where: {id, userId}})
    }

    async deleteByEmail(email, userId) {
        return await prisma.customer.deleteMany({ where: {email, userId}})
    }
}



