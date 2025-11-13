import {CustomerService} from "../services/CustomerService.js";

export class CostumerController {
    
    constructor() {
        this.customerService = new CustomerService()
    }

    async findAllCostumers(req, res) {
        try {
            const customers = await this.customerService.findAllCostumers()
            return res.status(200).json(customers)
            
        } catch (error) {
            return res.status(400).json({error: error.message})        
        }
    }
}