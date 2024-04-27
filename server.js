import express from "express";
// import mongoose from "mongoose";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    "https://swip-tory-front-end-soumava.vercel.app/",
    // "http://localhost:3000",
  ],
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
