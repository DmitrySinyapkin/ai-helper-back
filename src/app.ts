import express from "express";
import 'dotenv/config'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import chatRoutes from './routes/chatRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

export default app
