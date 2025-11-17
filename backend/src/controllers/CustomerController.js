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

    async findCustomerById(req, res, next)  {
        try {
            const customer = await this.customerService.findCustomerById(req.params.id, req.user.id)
            return res.status(200).json(customer)
            
        } catch (error) {
            next(error)
            
        }
    }
    async findCustomerByEmail(req, res, next) {
        try {
            const customer = await this.customerService.findCustomerByEmail(req.params.email, req.user.id)
            return res.status(200).json(customer)
            
        } catch (error) {
            next(error)
            
        }
    }

    async createCustomer(req, res, next) {   
        try {
             const customerCreated = await this.customerService.createCustomer(req.body, req.user.id)
             return res.status(201).json(customerCreated)
         
        } catch (error) {
           next(error)         
        }
    }

    async deleteCustomerById(req, res, next) {
        try {
            await this.customerService.deleteCustomerById(req.params.id, req.user.id)
            return res.status(204).json(`Cliente removido com sucesso com o ID: ${req.params.id}`)
            
        } catch (error) {
            console.log(error)
            next(error)           
        }
    }

    async deleteCustomerByEmail(req, res, next) {
        try {
            await this.customerService.deleteCustomerByEmail(req.params.email, req.user.id)
            return res.status(204).json(`Cliente removido com sucesso com o Email: ${req.params.email}`)
            
        } catch (error) {
            next(error)         
        }
    }
    



}
