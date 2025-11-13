import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class CostumerRepository {
    constructor() {}

    async findAll() {
        return await prisma.costumer.findMany()

    }
}