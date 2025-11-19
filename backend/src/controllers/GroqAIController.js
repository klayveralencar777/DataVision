import { GroqAIService } from "../services/GroqAIService.js";

export class GroqAIController {
    constructor() {
        this.groqService = new GroqAIService()
    }

    async findAnalysis(req, res, next) {
       

        try {
            const token = req.headers.authorization?.replace("Bearer ", "")         
            const analysis = await this.groqService.generateAnalysis(token)
            return res.status(200).json(analysis)
            
            
        } catch (error) {
            next()  
        }
    }

}
