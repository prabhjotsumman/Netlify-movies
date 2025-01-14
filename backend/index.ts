import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import serverless from "serverless-http";
import connectDB from "./config/db";
import actorRoutes from "./routes/actorRoutes";
import producerRoutes from "./routes/producerRoutes";
import movieRoutes from "./routes/movieRoutes";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

// Serve React frontend
const frontendPath = path.join(__dirname, "../../frontend/build");
console.log("frontendPath", frontendPath);

app.use(express.static(frontendPath));

// Routes
app.get("/test", (req: Request, res: Response) => {
  res.send("IMDB Clone Backend is Running!!");
});

app.use("/api/actors", actorRoutes);
app.use("/api/producers", producerRoutes);
app.use("/api/movies", movieRoutes);

// Catch-all route for React frontend
app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Handle process termination gracefully
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit(0);
});

// Export the serverless handler
export const handler = serverless(app);
