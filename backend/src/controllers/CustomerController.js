import {CustomerService} from "../services/CustomerService.js";

export class CustomerController {
    
    constructor() {
        this.customerService = new CustomerService()
    }

    async findAllCustomers(req, res) {    
        try {
        const customers = await this.customerService.findAllCustomers(req.user.id)
           return res.status(200).json(customers)
            
        } catch (error) {
            return res.status(401).json({error: error.message})
            
        }
    }

    async findCustomerById(req, res)  {
        try {
            const customer = await this.customerService.findCustomerById(req.params.id, req.user.id)
            return res.status(200).json(customer)
            
        } catch (error) {
            return res.status(404).json({error: error.message})
            
        }
    }
    async findCustomerByEmail(req, res) {
        try {
            const customer = await this.customerService.findCustomerByEmail(req.params.email, req.user.id)
            return res.status(200).json(customer)
            
        } catch (error) {
            return res.status(404).json({error: error.message})
            
        }
    }

    async createCustomer(req, res) {   
        try {
             const customerCreated = await this.customerService.createCustomer(req.body, req.user.id)
             return res.status(201).json(customerCreated)
         
        } catch (error) {
            console.log(error)
            return res.status(401).json({error: error.message})            
        }
    }

    async deleteCustomerById(req, res) {
        try {
            await this.customerService.deleteCustomerById(req.params.id, req.user.id)
            return res.status(204).json(`Cliente removido com sucesso com o ID: ${req.params.id}`)
            
        } catch (error) {
            console.log(error)
            return res.status(400).json({error: error.message})           
        }
    }

    async deleteCustomerByEmail(req, res) {
        try {
            await this.customerService.deleteCustomerByEmail(req.params.email, req.user.id)
            return res.status(204).json(`Cliente removido com sucesso com o Email: ${req.params.email}`)
            
        } catch (error) {
            return res.status(400).json({error: error.message})           
        }
    }
    



}
