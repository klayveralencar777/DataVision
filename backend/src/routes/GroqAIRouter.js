import express from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { GroqAIController } from "../controllers/GroqAIController.js";
const router = express.Router();
const controller = new GroqAIController();

router.use(AuthMiddleware);
router.get("/", controller.findAnalysis.bind(controller));

export default router;
