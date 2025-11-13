import { UserService } from "../services/UserService.js";
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthController {
    constructor() {
        this.userService = new UserService()
    }

    async userLogin(req, res) {
        const{email, password} = req.body
        try {
            const user = await this.userService.findUserByEmail(email)
            const checkPassword = await bycript.compare(password, user.password)
            if(!checkPassword) {
                return res.status(401).json({error: "Credenciais inválidas. Tente novamente"})
            }

            const payload = {sub: user.id, email: user.email}
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
            return res.status(401).json({error: error.message})
            
        }
    }
}
