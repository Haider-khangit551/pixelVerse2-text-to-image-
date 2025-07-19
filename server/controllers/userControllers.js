import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay';
import transationModel from "../models/transationModel.js";
import crypto from "crypto";

// Razorpay instance
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            success: true,
            token,
            user: { name: user.name }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            success: true,
            token,
            user: { name: user.name },
            message: "Login Successfully"
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// GET USER CREDITS
const userCreadits = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);

        res.json({
            success: true,
            credits: user.creditBalance,
            user: { name: user.name }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// CREATE PAYMENT ORDER
const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;

        if (!userId || !planId) {
            return res.json({ success: false, message: "Missing details" });
        }

        const userData = await userModel.findById(userId);

        let credits, plan, amount;
        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 5;
                amount = 10;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 25;
                amount = 50;
                break;
            case 'Business':
                plan = 'Business';
                credits = 100;
                amount = 250;
                break;
            default:
                return res.json({ success: false, message: "Invalid plan" });
        }

        const newTransaction = await transationModel.create({
            userId,
            plan,
            amount,
            credits,
            date: Date.now(),
            payment: false
        });

        const options = {
            amount: amount * 100, // Razorpay needs amount in paise
            currency: process.env.CURRENCY,
            receipt: newTransaction._id.toString()
        };

        razorpayInstance.orders.create(options, async (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error.message });
            }

            // Save Razorpay order ID to transaction
            await transationModel.findByIdAndUpdate(newTransaction._id, {
                razorpayOrderId: order.id
            });

            res.json({
                success: true,
                order
            });
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// VERIFY PAYMENT
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        // Step 1: Signature Verification
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // Step 2: Find transaction by Razorpay order ID
        const order = await transationModel.findOne({ razorpayOrderId: razorpay_order_id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        if (order.payment === true) {
            return res.status(400).json({ success: false, message: "Payment already verified" });
        }

        // Step 3: Add credits to user
        const user = await userModel.findById(order.userId);
        const newCredit = user.creditBalance + order.credits;

        await userModel.findByIdAndUpdate(user._id, { creditBalance: newCredit });
        await transationModel.findByIdAndUpdate(order._id, { payment: true });

        res.json({
            success: true,
            message: "Credits added successfully"
        });

    } catch (error) {
        console.error("Payment verify error:", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export {
    registerUser,
    loginUser,
    userCreadits,
    paymentRazorpay,
    verifyRazorpay
};
