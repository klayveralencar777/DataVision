import { UserRepository } from "../repositories/UserRepository.js";
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { EmailAlreadyExists } from "../exceptions/Exceptions.js";

export class EmailService {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async sendLogin(email) {
        let user = await this.userRepository.findByEmail(email)
        if(user) {
            throw new EmailAlreadyExists(`${email} já cadastrado, tente outro.`)
        }
        const password = Math.random().toString(36).slice(-8)
        const hashPassowrd = await bcrypt.hash(password, 10)
        user = await this.userRepository.create({      
                email,
                name: email.split("@")[0],
                password: hashPassowrd,
                role: "ADMIN",               
        })    
        await this.sendEmail(email, password)    
    }
    
    async sendEmail(to, password) {
        const send = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }

        })
        await send.sendMail({
            from: `Data-Vision <${process.env.EMAIL_USER}>`,
            to,
            subject: "Bem-vindo(a) ao DATA VISION.",
            text: `Olá! Seu acesso ao Data Vision foi criado com sucesso! \nEmail: ${to}\nSenha: ${password}`
        })
    }
}
