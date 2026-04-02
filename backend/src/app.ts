import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodeRoutes from "./routes/node.routes";
import { globalErrorHandler } from "./middlewares/error";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/nodes", nodeRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use(globalErrorHandler);

export default app;
