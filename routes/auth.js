import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db-utils/models.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const {
        name,
        image,
        id = Date.now(),
        dob,
        email,
        password,
    } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hashSync(password, 10);

        const newUser = new User({
            name,
            image,
            id,
            dob,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "5d",
            }
        );

        res.json({
            status: "Login sucessfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                dob: user.dob,
                image: user.image,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
