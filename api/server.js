import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import subscriptionRoutes from "./routes/subscriptions.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/subscriptions", subscriptionRoutes);

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});

