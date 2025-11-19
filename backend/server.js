import express from "express";
import cors from "cors";
import EmailRouter from "./src/routes/EmailRouter.js";
import UserRouter from "./src/routes/UserRoutes.js";
import LoginRouter from "./src/routes/LoginRouter.js";
import CustomerRouter from "./src/routes/CustomerRoutes.js";
import TransactionRouter from "./src/routes/TransactionRoutes.js";
import MetricsRouter from "./src/routes/MetricsRoutes.js";
import ExceptionHandler from './src/middlewares/ExceptionHandler.js'
import GroqAIRouter from './src/routes/GroqAIRouter.js'
const app = express();
const PORT = 3555;

//  cors
app.use(
  cors({
    origion: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use("/send", EmailRouter);
app.use("/users", UserRouter);
app.use("/auth", LoginRouter);
app.use("/customers", CustomerRouter);
app.use("/transactions", TransactionRouter);
app.use("/metrics", MetricsRouter);
app.use("/ai", GroqAIRouter)
app.use(ExceptionHandler)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
