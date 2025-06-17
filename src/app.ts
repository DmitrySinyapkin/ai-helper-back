import express, { ErrorRequestHandler } from "express";
import 'dotenv/config'
import cors from 'cors'
import { authMiddleware } from "./middleware/authMiddleware.js"
import { errorHandler } from "./utils/errorHandler.js"
import authRoutes from './routes/authRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import notesRoutes from './routes/notesRoutes.js'
import usersRoutes from './routes/usersRoutes.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

// @ts-ignore
app.use('/api/notes', [authMiddleware], notesRoutes)
// @ts-ignore
app.use('/api/users', [authMiddleware], usersRoutes)

// Global error handler - must be last
app.use(errorHandler as ErrorRequestHandler)

export default app
