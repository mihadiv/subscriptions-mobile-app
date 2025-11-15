import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();

//register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const [existing] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (existing.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
        "INSERT INTO users(name, email, password) VALUES (?,?,?)",
        [name, email, hashed]
    );

    res.json({message: "User registered successfully"});
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const user = rows[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

export default router;