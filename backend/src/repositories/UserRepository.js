import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export class UserRepository {
    constructor() {}

    async create(data) {
        return await prisma.user.create({ data })
    }

    async findAll() {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                role: true
            }
        })
    }
    async findByEmail(email) {
        return await prisma.user.findUnique({
             where: {email},
             select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                role: true
             }            
            })
    }
}
