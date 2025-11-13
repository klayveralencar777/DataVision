import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class CustomerRepository {
    constructor() {}

    async findAll() {
        return await prisma.costumer.findMany()

    }
}