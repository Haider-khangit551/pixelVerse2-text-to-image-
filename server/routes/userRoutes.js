import express from 'express'
import { registerUser, loginUser, userCreadits, paymentRazorpay, verifyRazorpay, } from '../controllers/userControllers.js'
import userAuth from '../middlewares/auth.js'


const userRouter = express.Router()


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth, userCreadits)
userRouter.post('/pay-razor', userAuth, paymentRazorpay)
userRouter.post('/verify-razor', userAuth, verifyRazorpay)


export default userRouter; 