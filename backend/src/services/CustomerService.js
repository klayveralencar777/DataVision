import {CustomerRepository} from "../repositories/CustomerRepository.js";

export class CustomerService {
    constructor() {
        this.customerRepository = new CustomerRepository()
    }
    
    async findAllCostumers() {
        return await this.customerRepository.findAll()
    }
}