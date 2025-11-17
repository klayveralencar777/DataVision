import { MetricsRepository } from "../repositories/MetricsRepository.js";

export class MetricsService {
    constructor() {
        this.metricsRepository = new MetricsRepository()
    }

    async getMetrics(userId) {  
        const totalCustomers = await this.metricsRepository.countCustomers(userId)
        const totalTransactions = await this.metricsRepository.countTransactions(userId)
        const activeCustomers = await this.metricsRepository.countActiveCustomers(userId)
        const totalRevenue = await this.metricsRepository.amountTransactions(userId)
        const averageTicket = await this.metricsRepository.averageTicket(userId)
        const topCustomers = await this.metricsRepository.topCustomers(userId)
        let conversionRate = (activeCustomers / totalCustomers) * 100
        if(totalCustomers <= 0) {
            conversionRate = 0
        }
        
        
        
        return {
            totalCustomers,
            totalTransactions,
            activeCustomers,
            totalRevenue: parseFloat(totalRevenue.toFixed(2)),
            averageTicket: parseFloat(averageTicket.toFixed(2)),
            topCustomers,
            conversionRate: parseFloat(conversionRate.toFixed(2))
        }
        
           
    } 
}



