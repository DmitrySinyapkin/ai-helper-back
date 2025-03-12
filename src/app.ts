import express from "express";
import 'dotenv/config'
import cors from 'cors'
import { authMiddleware } from "./middleware/authMiddleware"
import authRoutes from './routes/authRoutes'
import chatRoutes from './routes/chatRoutes'
import notesRoutes from './routes/notesRoutes'
import usersRoutes from './routes/usersRoutes'

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

// @ts-ignore
app.use('/api/notes', [authMiddleware], notesRoutes)
// @ts-ignore
app.use('/api/users', [authMiddleware], usersRoutes)

export default app
