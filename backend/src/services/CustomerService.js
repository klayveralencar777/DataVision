import {CustomerRepository} from "../repositories/CustomerRepository.js";

export class CustomerService {
    constructor() {
        this.customerRepository = new CustomerRepository()
    }
    
    async findAllCustomers(userId) {
        return await this.customerRepository.findAll(userId)
    }
    async findCustomerById(id, userId) {
        const customer = await this.customerRepository.findById(id, userId)
        if(!customer) {
            throw new Error(`Cliente não encontrado com o ID: ${id}`)
        }
        return customer
    }
    async findCustomerByEmail(email, userId) {
        const customer = await this.customerRepository.findByEmail(email, userId)
        if(!customer) {
            throw new Error(`Cliente não encontrado com o Email: ${email}`)
        }
        return customer
    }
    
    async createCustomer(customer, userId) {
        if (!userId) {
            throw new Error('Usuário não autenticado')
        }
        const exists = await this.customerRepository.findByEmail(customer.email, userId)
        if(exists) {
            throw new Error(`Já existe um cliente com o email: ${customer.email}`)
        }
        return await this.customerRepository.create(customer, userId)
    }

    async deleteCustomerById(id, userId) {
         await this.findCustomerById(id, userId)
         return await this.customerRepository.deleteById(id, userId)     
    }

    async deleteCustomerByEmail(email, userId) {
        await this.findCustomerByEmail(email, userId)
        return await this.customerRepository.deleteByEmail(email, userId)
    }
    
}