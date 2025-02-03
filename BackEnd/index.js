import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http"; // Import HTTP server
import { Server } from "socket.io"; // Import Socket.IO
import applicationRoute from "./routes/application.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import userRoute from "./routes/user.route.js";
import recruiterRoute from "./routes/recruiter.route.js";
import verificationRoute from "./routes/verification.route.js";
import orderRoute from "./routes/order.route.js";
import connectDB from "./utils/db.js";
import cron from "node-cron";
import { JobSubscription } from "./models/jobSubscription.model.js";
import { CandidateSubscription } from "./models/candidateSubscription.model.js";

dotenv.config({});

const app = express();
const server = createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend access
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/recruiter", recruiterRoute);
app.use("/api/v1/verification", verificationRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/order", orderRoute);

// Start Server with WebSockets
server.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});

// Socket.IO Handling
io.on("connection", (socket) => {
  
});

// Cron Job to Check for Expired Plans
cron.schedule("0 * * * *", async () => {
  try {
    const [jobSubscriptions, candidateSubscriptions] = await Promise.all([
      JobSubscription.find({ status: "Active" }),
      CandidateSubscription.find({ status: "Active" }),
    ]);

    await Promise.all([
      ...jobSubscriptions.map(async (subscription) => {
        const expired = await subscription.checkValidity();
        if (expired) {
          io.emit("planExpired", {
            companyId: subscription.company,
            type: "job", // Job plan expired
            message: "Job plan expired, please renew.",
          });
        }
      }),
      ...candidateSubscriptions.map(async (subscription) => {
        const expired = await subscription.checkValidity();
        if (expired) {
          io.emit("planExpired", {
            companyId: subscription.company,
            type: "candidate", // Candidate plan expired
            message: "Candidate data plan expired, please renew.",
          });

        }
      }),
    ]);
  } catch (error) {
    console.error("Error in subscription check:", error);
  }
});


