import { MetricsService } from "../services/MetricsService.js";

export class MetricsController {
    constructor() {
        this.metricsService = new MetricsService()
    }
    async countCustomers(req, res, next) {
        try {
           
            const metrics = await this.metricsService.getMetrics(req.user.id)
            return res.status(200).json(metrics)
            
            
        } catch (error) {
            next(error)    
        }
    }
}
