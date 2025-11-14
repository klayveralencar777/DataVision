import {CustomerService} from "../services/CustomerService.js";

export class CustomerController {
    
    constructor() {
        this.customerService = new CustomerService()
    }

    async findAllCustomers(req, res) {
        const customers = req.body
        const userId = req.user.id
        try {
           await this.customerService.findAllCustomers(customers, userId)
           return res.status(200).json(customers)
            
        } catch (error) {
            return res.status(401).json({error: error.message})
            
        }
    }
    async createCustomer(req, res) {
        const newCustomer = req.body
        const userId = req.user.id
        try {
             const customerCreated = await this.customerService.createCustomer(newCustomer, userId)
             return res.status(201).json(customerCreated)
         
        } catch (error) {
            console.log(error)
            return res.status(401).json({error: error.message})            
        }
    }

}
