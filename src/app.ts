import express from "express";
import 'dotenv/config'
import authRoutes from './routes/authRoutes'
import chatRoutes from './routes/chatRoutes'

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

export default app
