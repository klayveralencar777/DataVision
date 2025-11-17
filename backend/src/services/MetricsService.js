import { MetricsRepository } from "../repositories/MetricsRepository.js";

export class MetricsService {
    constructor() {
        this.metricsRepository = new MetricsRepository()
    }

    async getMetrics(userId) {
        const totalCustomers = await this.metricsRepository.countCustomers(userId)
        const totalTransactions = await this.metricsRepository.countTransactions(userId)
        const activeCustomers = await this.metricsRepository.countActiveCustomers(userId)


        return {
            totalCustomers,
            totalTransactions,
            activeCustomers
        }
        
           
    }
  
}



