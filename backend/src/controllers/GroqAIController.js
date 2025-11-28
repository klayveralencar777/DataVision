import { GroqAIService } from "../services/GroqAIService.js";

export class GroqAIController {
  constructor() {
    this.groqService = new GroqAIService();
  }

  async findAnalysis(req, res, next) {
    console.log(
      "[GroqAIController] findAnalysis called - method:",
      req.method,
      "path:",
      req.originalUrl
    );
    console.log("[GroqAIController] headers sample:", {
      authorization: req.headers.authorization,
    });

    try {
      const token = req.headers.authorization?.replace("Bearer ", "") || null;
      console.log(
        "[GroqAIController] token extracted:",
        token ? "present" : "missing"
      );

      const analysis = await this.groqService.generateAnalysis(token);

      console.log(
        "[GroqAIController] analysis generated, returning response (length):",
        analysis?.length || 0
      );
      return res.status(200).json({ response: analysis });
    } catch (error) {
      console.error(
        "[GroqAIController] error in findAnalysis:",
        error?.message || error
      );
      return next(error);
    }
  }
}
