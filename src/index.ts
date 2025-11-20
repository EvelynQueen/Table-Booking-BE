import express from "express";
import cors from "cors";
import { connectDB } from "./models/dbConnect";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import floorRouter from "./routes/floorRouter";
const app = express();
const PORT = 3000;

app.use(express.json()); // parse JSON bodies

// CORS whitelist
const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      // allow requests with no origin (like Postman) or in whitelist
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// Apply CORS middleware
app.use(cors(corsOptions));

// Connect to DB
connectDB();

// Mount router under /api
app.use("/api", authRouter);
app.use("/api", floorRouter);
app.use("/api", userRouter);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
