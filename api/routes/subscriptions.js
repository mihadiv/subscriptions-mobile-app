import express from "express";
import { db } from "../db.js";

const router = express.Router();

// ADD subscription
router.post("/add", async (req, res) => {
    const { user_id, name, price, start_date, duration_months, expiry_date } = req.body;

    try {
        await db.query(
            "INSERT INTO subscriptions (user_id, name, price, start_date, duration_months, expiry_date) VALUES (?, ?, ?, ?, ?, ?)",
            [user_id, name, price, start_date, duration_months, expiry_date]
        );
        res.json({ message: "Subscription added successfully!" });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error adding subscription" });
    }
});

// GET subscriptions for a user
router.get("/list/:user_id", async (req, res) => {
    const { user_id } = req.params;

    try {
        const [rows] = await db.query(
            "SELECT * FROM subscriptions WHERE user_id = ?",
            [user_id]
        );

        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching subscriptions" });
    }
});

export default router;