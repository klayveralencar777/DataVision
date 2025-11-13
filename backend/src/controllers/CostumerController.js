import { CostumerService } from "../services/CostumerService.js";

export class CostumerController {
    
    constructor() {
        this.costumerService = new CostumerService()
    }

    async findAllCostumers(req, res) {
        try {
            const costumers = await this.costumerService.findAllCostumers()
            return res.status(200).json(costumers)
            
        } catch (error) {
            return res.status(400).json({error: error.message})        
        }
    }
}