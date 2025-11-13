import {CustomerService} from "../services/CustomerService.js";

export class CustomerController {
    
    constructor() {
        this.customerService = new CustomerService()
    }

    async findAllCustomers(req, res) {
        try {
            const customers = await this.customerService.findAllCustomers()
            return res.status(200).json(customers)
            
        } catch (error) {
            return res.status(400).json({error: error.message})        
        }
    }
}