import { MetricsService } from "../services/MetricsService.js";

export class MetricsController {
    constructor() {
        this.metricsService = new MetricsService()
    }
    async countCustomers(req, res) {
        try {
           
            const metrics = await this.metricsService.getMetrics(req.user.id)
            return res.status(200).json(metrics)
            
            
        } catch (error) {
            return res.status(401).json({error: error.message})      
        }
    }
}
