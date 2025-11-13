import { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
    constructor() {
        this.userRepository =  new UserRepository()
    }
    
    async findAllUsers() {
        return await this.userRepository.findAll()
    }

    async findUserByEmail(email) {
        const user = await this.userRepository.findByEmail(email)
        if(!user) {
            throw new Error(`Usuário com o email ${email} não encontrado.`)
        }
        return user     
    }
 }