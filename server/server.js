import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import path from 'path'

const PORT = process.env.PORT || 4000

const app = express()

const _dirname = path.resolve()

// app.use(express.json());


// ✅ This parses incoming JSON
app.use(express.json())

// ✅ If you're also using form data (like from an HTML form)
app.use(express.urlencoded({ extended: true }))

app.use(cors())
await connectDB()


app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)


app.use(express.static(path.join(_dirname, "/client/dist")))

app.get(/.*/, (_, res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
})

app.listen(PORT, async () => {
    console.log("Server is running..." + PORT)
})