import { MetricsRepository } from "../repositories/MetricsRepository.js";

export class MetricsService {
    constructor() {
        this.metricsRepository = new MetricsRepository()
    }

    async getMetrics(userId) {
        const[
            totalCustomers,
            totalTransactions,

        ] = await Promise.all([
            this.metricsRepository.countCustomers(userId),
            this.metricsRepository.countTransactions(userId)
        ])
        

        return {
            totalCustomers,
            totalTransactions
        }
           
    }

   
}



