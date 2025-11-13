import { CostumerRepository } from "../repositories/CostumerRepository.js";

export class CostumerService {
    constructor() {
        this.costumerRepository = new CostumerRepository()
    }
    
    async findAllCostumers() {
        return await this.costumerRepository.findAll()
    }
}