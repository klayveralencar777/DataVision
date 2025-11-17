import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class MetricsRepository {
    constructor() { }

    async countCustomers(userId) {
        return await prisma.customer.count({ where: { userId } })
    }

    async countActiveCustomers(userId) {
        return await prisma.customer.count({
            where: { userId, status: "ativo" }
        })
    }
    async countTransactions(userId) {
        return await prisma.transaction.count({
            where: { customer: { userId } }

        })
    }

    async amountTransactions(userId) {
        const result = await prisma.transaction.aggregate({
            where: { customer: { userId } },
            _sum: { amount: true }
        })
        return result._sum.amount || 0
    }

    async averageTicket(userId) {
        const result = await prisma.transaction.aggregate({
            where: { customer: { userId } },
            _avg: { amount: true }
        })
        return result._avg.amount || 0
    }

    async topCustomers(userId) {
        return await prisma.customer.findMany({
            where: { userId },
            include: { transactions: true }

        }).then(customers => {
            return customers.map(customer => ({
                id: customer.id,
                name: customer.name,
                totalPaid: Number(customer.transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2))
            }))
                .sort((a, b) => b.totalPaid - a.totalPaid)
                .slice(0, 10);
        })
    }









}

