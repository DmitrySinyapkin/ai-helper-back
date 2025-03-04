import express from "express";
//import 'dotenv/config'
import dotenv from 'dotenv'

dotenv.config()
dotenv.config({ path: '.env.local' })

const app = express()

app.use(express.json())

export default app
