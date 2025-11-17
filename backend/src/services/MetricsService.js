import { MetricsRepository } from "../repositories/MetricsRepository.js";

export class MetricsService {
    constructor() {
        this.metricsRepository = new MetricsRepository()
    }

    async getMetrics(userId) {  
        const totalCustomers = await this.metricsRepository.countCustomers(userId)
        const totalTransactions = await this.metricsRepository.countTransactions(userId)
        const activeCustomers = await this.metricsRepository.countActiveCustomers(userId)
        const amountTransactions = await this.metricsRepository.amountTransactions(userId)
        const averageTicket = await this.metricsRepository.averageTicket(userId)

        return {
            totalCustomers,
            totalTransactions,
            activeCustomers,
            amountTransactions: parseFloat(amountTransactions.toFixed(2)),
            averageTicket: parseFloat(averageTicket.toFixed(2))
        }
        
           
    } 
}



