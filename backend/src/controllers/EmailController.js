import { EmailService } from "../services/EmailService.js";

export class EmailController {
    constructor() {
        this.emailService = new EmailService()
       
    }
    async sendEmail(req, res, next) {
        console.log(req.body)
        const {email} = req.body
        try {
            await this.emailService.sendLogin(email)
            return res.status(200).json({message: "Login enviado com sucesso! Verifique seu email"})
            
        } catch (error) {
            next(error)
            
        }
    }

}