import { UserService } from "../services/UserService.js";

export class UserController{
    constructor() {
        this.userService = new UserService()
    }
    async findAllUsers(req, res) {
        
        try {
            const users = await this.userService.findAllUsers()
            return res.status(200).json(users)
            
        } catch (error) {
            return res.status(404).json({message: error.message})         
        }
    }
}
