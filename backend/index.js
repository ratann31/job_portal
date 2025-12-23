import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Load environment variables
dotenv.config();

const app = express();

/* =======================
   MIDDLEWARES
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: [
        "http://localhost:5173",           // local frontend
        "https://your-frontend.onrender.com" // deployed frontend
    ],
    credentials: true
};

app.use(cors(corsOptions));

/* =======================
   HEALTH CHECK ROUTE
======================= */
app.get("/", (req, res) => {
    res.status(200).send("Backend is running successfully 🚀");
});

/* =======================
   API ROUTES
======================= */
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

/* =======================
   SERVER + DATABASE
======================= */
const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    });
