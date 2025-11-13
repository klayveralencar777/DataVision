import { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
    constructor() {
        this.userRepository =  new UserRepository()
    }
    
    async findAllUsers() {
        return await this.userRepository.findAll()
    }
 }