import { UserService } from "../services/UserService.js";

export class UserController{
    constructor() {
        this.userService = new UserService()
    }
    async findAllUsers(req, res, next) {
        
        try {
            const users = await this.userService.findAllUsers()
            return res.status(200).json(users)
            
        } catch (error) {
            next(error)    
        }
    }
    async findUserByEmail(req, res, next) {
        try {
            const user = await this.userService.findUserByEmail(req.params.email)
            return res.status(200).json(user)
            
        } catch (error) {
            next(error)          
        }
    }
}
