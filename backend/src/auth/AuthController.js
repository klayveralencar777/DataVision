import { UserService } from "../services/UserService.js";
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from "../exceptions/Exceptions.js";

export class AuthController {
    constructor() {
        this.userService = new UserService()
    }

    async userLogin(req, res, next) {
        const{email, password} = req.body
        try {
            const user = await this.userService.findUserByEmail(email)
            const checkPassword = await bycript.compare(password, user.password)
            if(!checkPassword) {
                throw new UnauthorizedError(`Credenciais inválidas. Tente novamente`)
            }

            const payload = {id: user.id, role: user.role}
            const secret = process.env.JWT_SECRET
            const expiresIn = process.env.JWT_EXPIRES_IN

            const token = jwt.sign(payload, secret, {expiresIn})
            return res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            })

        } catch (error) {
            next(error)
            
        }
    }
}
