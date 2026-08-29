import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({ message: "Bienvenue sur le server! Tu peux commencer à utiliser l'API." });
});

app.use("/api/users", userRouter);

await connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`LE SERVER EST MAINTENANT EN COURS D'EXÉCUTION SUR LE PORT ${PORT}`);
    });
});