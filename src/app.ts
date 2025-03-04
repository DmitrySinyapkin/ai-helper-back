import express from "express";
import 'dotenv/config'
//import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'

//dotenv.config()
//dotenv.config({ path: '.env.local' })

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)

export default app
